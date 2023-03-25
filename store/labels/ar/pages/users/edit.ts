export default {
	breadCrumb: 'Create User',
	editHeader: 'Edit User',
	createHeader: 'Create User',
	userCreated: 'User created successfully',
	userUpdated: 'User updated successfully',
	actions: {
		save: 'Save',
	},
	successes: {
		createSuccess: 'User created successfully',
		updateSuccess: 'User updated successfully',
		activateSuccess: (id: number) => `The user with ID = ${id} has been activated successfully`,
		deActivateSuccess: (id: number) =>
			`The user with ID = ${id} has been deactivated successfully`,
	},
	errors: {
		createFailure: 'An error happened while trying to create a user, please try again later',
		updateFailure: 'An error happened while trying to update the user, please try again later',
		activationFailure: (id: number) =>
			`An error happened while trying to activate the user with ID = ${id}, please try again later`,
		deActivationFailure: (id: number) =>
			`An error happened while trying to deactivate the user with ID = ${id}, please try again later`,
	},
	fields: {
		userName: 'User Name',
		name: 'Name',
		surname: 'Surname',
		emailAddress: 'Email',
		password: 'Password',
		roles: {
			label: 'Roles',
			rolesPlaceholder: 'Roles',
			rolesLoading: 'Loading ...',
			rolesNotFound: 'No roles found',
			noRolesLoaded: 'Unable to get the list of roles. Please, try again later.',
			validationMessage: 'Please choose roles',
		},
	},
}
