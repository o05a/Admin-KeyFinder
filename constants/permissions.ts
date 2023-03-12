const permissions = {
	auth: {
		service: 0,
		seeRoles: 1,
		findUser: 2,
		userAdmin: 4,
		editRoles: 8,
		seePermissions: 16,
		assignRoles: 32,
	},
	inventory: {
		service: 1,
		canViewData: 1,
		canEditData: 2,
		inventoryAdmin: 4,
	},
	reporting: {
		service: 2,
		canViewData: 1,
		canEditData: 2,
		reportingAdmin: 4,
	},
	system: {
		service: 3,
		isAccountManager: 1,
		isAdmin: 2,
		isSuperAdmin: 4,
	},
	advertiser: {
		service: 4,
		canViewData: 1,
		canEditData: 2,
		advertiserAdmin: 4,
	},
	forecast: {
		service: 5,
		canViewData: 1,
		canEditData: 2,
		forecastAdmin: 4,
	},
	campaign: {
		service: 6,
		canViewData: 1,
		canEditData: 2,
		campaignAdmin: 4,
	},
	publisher: {
		service: 7,
		canViewData: 1,
		canEditData: 2,
		publisherAdmin: 4,
	},
	metaverse: {
		service: 8,
		canViewData: 1,
		canEditData: 2,
		metaverseAdmin: 4,
	},
}

export type Permissions = typeof permissions

type SystemKeys = `system:${keyof Permissions['system']}`
type AuthKeys = `auth:${keyof Permissions['auth']}`
type InventoryKeys = `inventory:${keyof Permissions['inventory']}`
type ReportingKeys = `reporting:${keyof Permissions['reporting']}`
type AdvertiserKeys = `advertiser:${keyof Permissions['advertiser']}`
type ForecastKeys = `forecast:${keyof Permissions['forecast']}`
type CampaignKeys = `campaign:${keyof Permissions['campaign']}`
type PublisherKeys = `publisher:${keyof Permissions['publisher']}`
type MetaverseKeys = `metaverse:${keyof Permissions['metaverse']}`
export type PermissionsTypeString =
	| SystemKeys
	| AuthKeys
	| InventoryKeys
	| ReportingKeys
	| AdvertiserKeys
	| ForecastKeys
	| CampaignKeys
	| PublisherKeys
	| MetaverseKeys

export default permissions
