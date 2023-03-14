import edit from './edit'

export default {
	title: `Users`,
	header: `Users`,
	breadCrumb: `Users`,
	createUser: 'Add user',
	errors: {
		rowUpdateError: 'Unable to save row updates. Please, try again later.',
		noDataSpecified: '-',
		noListLoaded: `Unable to get the list of users. Please, try again later.`,
	},
	footer: {
		rowsPerPage: 'Rows per page:',
		pageCounter: (from: number, to: number, total: number) => `${from}-${to} of ${total}`,
	},
	columns: {
		status: 'Active',
		id: 'Id',
		userName: 'User Name',
		fullName: 'Full Name',
		emailAddress: 'Email',
		roles: 'Roles',
		lastLogin: 'Last Login',
		creation: 'Creation Date',
		actions: {
			menuTitle: 'Actions',
		},
	},
	fields: {
		columnSelector: {
			noOptionsText: 'No columns',
			tooltip: 'Column selector',
			placeholder: 'Column title',
			hideAllLabel: 'Hide all',
			showAllLabel: 'Show all',
		},
		search: {
			tooltip: 'Search',
			placeholder: 'Search users',
		},
	},
	edit,
}
