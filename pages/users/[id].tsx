import { GetServerSideProps } from 'next'
import pages from '@constants/pages'
import WithAppBar from '@components/Layouts/WithAppBar'
import WithDrawer from '@components/Layouts/WithDrawer'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import WithHeader from '@components/Layouts/WithHeader'
import WithMotion from '@components/Layouts/WithMotion'
import { NextPageWithProps } from '@interfaces/NextPage'
import { FormFieldDataUpdater, FormFieldErrorsDataUpdater, getDataByFieldsList } from '@forms'
import { IFieldValue } from '@forms/generate/types/IFieldValue'
import { handleBlur, SomeObject } from '@admixltd/admix-component-library'
import styled from '@emotion/styled'
import UserService from '@api/Models/users'
import withServerSideBaseProps, { ServerSideBaseProps } from '@helpers/withServerSideBaseProps'
import { getRecoil, setRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import formFieldsValidation from '@utils/forms/formFieldsValidation'
import getLabels from '@helpers/getLabels'
import { getRouter } from '@helpers/RouterNexus'
import Meta from '@components/Layouts/Meta'
import { User, UserFilter } from '@api/Models/users/types'
import dataPrefix from '@components/Pages/Users/Edit/dataPrefix'
import UserFormLoadingAtom from '@atoms/Users/Edit/UserFormLoadingAtom'
import { createFormDataToUser, userToFormData } from '@api/Models/users/formDataConverter'
import UserFormUpdatedAtom from '@atoms/Users/Edit/UserFormUpdated'
import CreateUserFormContent from '@components/Pages/Users/Edit/FormContent/CreateUserFormContent'
import UserFormActions from '@components/Pages/Users/Edit/UserFormActions'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import GetRolesFormContent from '@components/Pages/Users/Edit/FormContent/GetRolesFormContent'

const formValidation = async (requestData: Partial<UserFilter>) => {
	handleBlur()
	const fieldsList: string[] = []
	Object.keys(requestData).forEach(key => fieldsList.push(key))

	return (async () => {
		/**
		 * Update FormFieldErrorsDataUpdater with form validation errors
		 */
		await formFieldsValidation({
			fieldsList,
			dataPrefix,
		})
		/**
		 * Check if sub-form has errors
		 */
		const errors = getRecoil(FormFieldErrorsDataUpdater)
		let valid = true
		Object.keys(requestData).forEach(key => {
			if (errors[`${dataPrefix}${key}`]) valid = false
		})
		return valid
	})()
}

const handleCreate = async () => {
	;(async () => {
		setRecoil(UserFormLoadingAtom, true)
		/**
		 * Get data from state
		 */
		const formData = getDataByFieldsList({ dataPrefix })
		/**
		 * Map data
		 */
		const requestData = createFormDataToUser({ formData })
		const formValid = await formValidation(requestData)
		await (async () => {
			if (!formValid) return

			/**
			 * Create User
			 */
			const create = await UserService.create(requestData)
			if ('error' in create) return

			const { successes, errors } = getLabels().pages.users.edit
			/**
			 * Show result message
			 */
			const createError = create.error?.message ?? errors.createFailure
			Snackbar.toast(
				create.error ? createError : successes.createSuccess,
				create.error ? 'error' : 'success'
			)
			setRecoil(UserFormUpdatedAtom, false)
			setRecoil(UserFormLoadingAtom, false)
			getRouter()?.push(pages.users.url)
		})()
		setRecoil(UserFormLoadingAtom, false)
	})()
}

const Page: NextPageWithProps<{
	user: User
	mode?: 'create' | 'edit'
}> = ({ user, mode }) => {
	const isCreate = mode === 'create'
	const labels = useRecoilValue(LabelsAtom).pages.users.edit
	const userName = isCreate ? labels.createHeader : user.userName
	const header = isCreate ? labels.createHeader : labels.editHeader

	return (
		<WithMotion>
			<Meta title={userName} />
			<HeaderContainer>
				<WithHeader title={header} />
			</HeaderContainer>
			{isCreate && (
				<Form
					onSubmit={e => {
						e.preventDefault()
						handleCreate()
					}}
				>
					<CreateUserFormContent />
					<GetRolesFormContent />
					<UserFormActions />
				</Form>
			)}
		</WithMotion>
	)
}

const HeaderContainer = styled.div`
	padding: 16px 0;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 45%;
	min-width: 500px;
	padding-right: 24px;

	.StyledChipContainer {
		margin-left: 8px;
		margin-right: 8px;
	}
`

export const getServerSideProps: GetServerSideProps = withServerSideBaseProps(
	async ({ query, props }: ServerSideBaseProps) => {
		if (query.id === 'create') {
			return {
				props: {
					...props,
					user: { userName: '' },
					mode: 'create',
				},
			}
		}
		const request = await UserService.getOne(String(query.id))

		if ('redirect' in request) {
			const { redirect } = request
			return {
				redirect,
				props: {},
			}
		}

		if ('id' in request) {
			return {
				props: {
					...props,
					user: request,
					mode: 'edit',
				},
			}
		}

		return {
			redirect: {
				destination: pages.users.url,
				permanent: false,
			},
			props: {},
		}
	}
)

Page.breadCrumb = ({ user }: { user: User }) => ({
	title: user?.userName
		? `${user.userName} - ${user.emailAddress}`
		: getLabels().pages.users.edit.breadCrumb,
})

Page.getLayout = page => (
	<WithAppBar>
		<WithDrawer>{page}</WithDrawer>
	</WithAppBar>
)

Page.recoilSetter = ({ set, reset }, { user }) => {
	reset(FormFieldErrorsDataUpdater)
	reset(UserFormUpdatedAtom)
	if (!user) return
	const FormData: SomeObject<IFieldValue> = {}
	const mappedData = userToFormData(user)
	Object.keys(mappedData).forEach(key => {
		FormData[`${dataPrefix}${key}`] = mappedData[key as keyof typeof mappedData] as IFieldValue
	})
	set(FormFieldDataUpdater, FormData)
}

export default Page
