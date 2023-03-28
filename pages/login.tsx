import { NextPage } from 'next'
import Meta from '@components/Layouts/Meta'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { Fields } from '@forms'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { FormEvent, useMemo, useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button, handleBlur } from '@admixltd/admix-component-library'
import formFieldsValidation from '@utils/forms/formFieldsValidation'
import pages from '@constants/pages'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import getDataByFieldsList from '@forms/utils/getDataByFieldsList'
import Auth from '@api/Models/Auth'

const dataPrefix = 'LoginPage__'
const Login: NextPage = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const labels = useRecoilValue(LabelsAtom).pages.login

	const { fields, names: fieldsList } = useMemo(() => {
		const { email, password, remember } = labels.fields
		return Fields(
			[
				{
					type: 'RegularInput',
					name: 'userNameOrEmailAddress',
					validation: ['required', 'email'],
					props: {
						label: email.label,
						placeholder: email.placeholder,
						requiredLabel: true,
					},
				},
				{
					type: 'PasswordInput',
					name: 'password',
					validation: ['required'],
					props: {
						label: password.label,
						placeholder: password.placeholder,
						requiredLabel: true,
					},
				},
				{
					type: 'CheckBox',
					name: 'remember',
					props: {
						label: remember.label,
					},
				},
			],
			{
				dataPrefix,
			}
		)
	}, [labels])

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setLoading(true)
		console.log('test123')

		const result = await (async () => {
			handleBlur()
			const formValid = await (async () => {
				/**
				 * Check form fields
				 */
				if (!(await formFieldsValidation({ fieldsList }))) return
				return true
			})()
			if (!formValid) return

			const { userNameOrEmailAddress, password, remember } = getDataByFieldsList({
				fieldsList,
				dataPrefix,
			})
			console.log(userNameOrEmailAddress, password, remember)
			const loginResponse = await Auth.login({
				userNameOrEmailAddress,
				password,
			})
			console.log('123',loginResponse)
			const signInResult = await signIn('credentials', {
				userNameOrEmailAddress,
				password,
				remember,
				redirect: false,
			})
			console.log('signInResult', signInResult?.error)
			if (!signInResult) return

			const { ok, error } = signInResult
			if (error) {
				return Snackbar.error(error)
			}
			if (!ok) return

			const {
				query: { callbackUrl },
			} = router
			router.push(`${callbackUrl ?? pages.dashboard.url}`)
			return true
		})()

		if (!result) {
			return setLoading(false)
		}
	}
	return (
		<Box
			component="form"
			onSubmit={handleFormSubmit}
			m="auto"
			width={300}
			display="grid"
			gap={2}
		>
			<Meta />
			{fields}
			<Button type="submit" variant="contained" loading={loading}>
				{labels.submit}
			</Button>
		</Box>
	)
}

export default Login
