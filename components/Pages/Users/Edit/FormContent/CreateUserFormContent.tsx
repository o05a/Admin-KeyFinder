import { Fields } from '@forms'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import dataPrefix from '../dataPrefix'

const CreateUserFormContent = () => {
	const labels = useRecoilValue(LabelsAtom).pages.users.edit
	const { colors } = useTheme()

	const { fields } = Fields(
		[
			{
				component: Container,
				sections: [
					{
						type: 'RegularInput',
						name: 'userName',
						validation: ['required'],
						props: {
							label: labels.fields.userName,
							placeholder: labels.fields.userName,
							requiredLabel: true,
						},
					},
					{
						type: 'RegularInput',
						name: 'name',
						validation: ['required'],
						props: {
							label: labels.fields.name,
							placeholder: labels.fields.name,
							requiredLabel: true,
						},
					},
					{
						type: 'RegularInput',
						name: 'surname',
						validation: ['required'],
						props: {
							label: labels.fields.surname,
							placeholder: labels.fields.surname,
							requiredLabel: true,
						},
					},
					{
						type: 'RegularInput',
						name: 'emailAddress',
						validation: ['required', 'email'],
						props: {
							label: labels.fields.emailAddress,
							placeholder: labels.fields.emailAddress,
							requiredLabel: true,
						},
					},
					{
						type: 'PasswordInput',
						name: 'password',
						validation: ['required', { name: 'minLength', options: { value: 6 } }],
						props: {
							label: labels.fields.password,
							placeholder: labels.fields.password,
							requiredLabel: true,
							legendBackground: colors.gray100,
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

const Container = styled.div`
	display: grid;
	gap: 16px;
	margin: 16px 0;
`

export default CreateUserFormContent
