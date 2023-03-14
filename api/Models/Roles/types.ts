export interface RoleFilter {
	id: number
	name: string
	displayName: string
	normalizedName: string
	description?: string
	grantedPermissions: string[]
}

export type Role = RoleFilter
