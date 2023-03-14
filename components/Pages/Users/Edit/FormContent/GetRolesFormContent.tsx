import { Fields } from '@forms'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { useTheme } from '@emotion/react'
import RoleService from '@api/Models/Roles'
import { useState } from 'react'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { Role } from '@api/Models/Roles/types'
import dataPrefix from '../dataPrefix'

const GetRolesFormContent = () => {
	const labels = useRecoilValue(LabelsAtom).pages.users.edit.fields.roles
	const { colors } = useTheme()

	const [loading, setLoading] = useState(false)
	const [roleList, setRoleList] = useState<Partial<Role>[]>([])

	const updateRoleList = async (searchValue: string) => {
		setLoading(true)
		const request = await RoleService.get()

		if ('error' in request) {
			Snackbar.error(request.error?.message ?? labels.noRolesLoaded)
			return
		}

		const { items } = request
		if (!Array.isArray(items)) {
			setRoleList([])
			setLoading(false)
			return
		}
		const roels = items.map(({ displayName, ...other }: Role) => ({
			title: displayName,
			displayName,
			...other,
		}))
		setRoleList(roels)
		setLoading(false)
	}

	const updateRoleListDebounced = AwesomeDebouncePromise(updateRoleList, 500)

	const { fields } = Fields(
		[
			{
				component: Section,
				sections: [
					{
						type: 'AutocompleteMultipleAsync',
						name: 'roleNames',
						validation: [
							{ name: 'required', options: { message: labels.validationMessage } },
						],
						props: {
							label: labels.label,
							checkboxes: true,
							options: roleList,
							loading,
							inputProps: {
								placeholder: labels.rolesPlaceholder,
							},
							noOptionsText: loading ? labels.rolesLoading : labels.rolesNotFound,
							onFocus: () => {
								if (roleList.length !== 0) return
								if (loading) return
								updateRoleListDebounced('')
							},
							onInputChange: (_: unknown, inputValue: string, reason: string) => {
								if (reason !== 'input') return
								updateRoleListDebounced(inputValue)
							},
							disableClearable: true,
						},
					},
				],
			},
		],
		{
			dataPrefix,
			extraProps: {
				input: {
					legendBackground: colors.gray100,
				},
			},
		}
	)
	return <div>{fields}</div>
}

const Section = styled.div`
	display: grid;
	gap: 16px;
	margin: 16px 0;
`

export default GetRolesFormContent
