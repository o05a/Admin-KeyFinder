export interface UserFilter {
	id: number
	userName: string
	name: string
	surname: string
	emailAddress: string
	isActive: boolean
	fullName: string
	lastLoginTime: string
	creationTime: string
	roleNames: string[]
	password?: string
}

export type User = UserFilter
