export default {
	breadCrumb: 'إنشاء مستخدم',
	editHeader: 'تعديل المستخدم',
	createHeader: 'إنشاء مستخدم',
	actions: {
		save: 'حفظ',
	},
	successes: {
		createSuccess: 'تم إضافة مستخدم بنجاح',
		updateSuccess: 'تم تعديل المستخدم بنجاح',
		activateSuccess: (id: number) => `تم تفعيل المستخدم صاحب المعرف ${id} بنجاح`,
		deActivateSuccess: (id: number) => `تم إلغاء تفعيل المستخدم صاحب المعرف ${id} بنجاح`,
	},
	errors: {
		createFailure: 'حصل خطأ أثناء محاولة إنشاء مستخدم جديد، يرجى المحاولة لاحقاً',
		updateFailure: 'حصل خطأ أثناء محاولة تعديل المستخدم، يرجى المحاولة لاحقاً',
		activationFailure: (id: number) =>
			`حصل خطأ أثناء تفعيل المستخدم صاحب المعرف ${id}، الرجاء المحاولة لاحقاً`,
		deActivationFailure: (id: number) =>
			`حصل خطأ أثناء إلغاء تفعيل المستخدم صاحب المعرف ${id}، الرجاء المحاولة لاحقاً`,
	},
	fields: {
		userName: 'اسم المستخدم',
		name: 'الاسم',
		surname: 'الكنية',
		emailAddress: 'البريد الالكتروني',
		password: 'كلمة المرور',
		roles: {
			label: 'الأدوار',
			rolesPlaceholder: 'الأدوار',
			rolesLoading: 'جاري البحث ...',
			rolesNotFound: 'لم يتم العثور على أي دور',
			noRolesLoaded: 'لم نتمكن من العثور على قائمة الأدوار المتاحة، الرجاء المحاولة لاحقاً',
			validationMessage: 'الرجاء اختيار أدوار من القائمة',
		},
	},
}
