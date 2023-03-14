import { SomeObject } from '@admixltd/admix-component-library'
import { Role } from '../Roles/types'
import { FormDataProps } from './formDataTypes'
import { User } from './types'

export const userToFormData: (user: User) => Partial<FormDataProps> = user => {
	const formData: Partial<FormDataProps> = {}
	const { userName, name, surname, emailAddress, roleNames } = user

	formData.userName = userName
	formData.name = name
	formData.surname = surname
	formData.emailAddress = emailAddress
	formData.roleNames = roleNames

	return formData
}

export const createFormDataToUser: ({
	formData,
	dataPrefix,
}: {
	formData: SomeObject
	dataPrefix?: string
}) => Partial<User> = ({ formData, dataPrefix }) => {
	const user: Partial<User> = {}
	const roles = formData[dataPrefix ? `${dataPrefix}roleNames` : 'roleNames']
	const roleNames = Array.isArray(roles) ? roles.map((role: Role) => role.name) : null
	user.userName = formData[dataPrefix ? `${dataPrefix}userName` : 'userName'] as string
	user.name = formData[dataPrefix ? `${dataPrefix}name` : 'name'] as string
	user.surname = formData[dataPrefix ? `${dataPrefix}surname` : 'surname'] as string
	user.emailAddress = formData[
		dataPrefix ? `${dataPrefix}emailAddress` : 'emailAddress'
	] as string
	user.roleNames = roleNames as string[]
	user.password = formData[dataPrefix ? `${dataPrefix}password` : 'password'] as string
	user.isActive = true
	return user
}
