import edit from './edit'

export default {
	title: `إدارة المستخدمين`,
	header: `إدارة المستخدمين`,
	breadCrumb: `إدارة المستخدمين`,
	createUser: 'إضافة مستخدم',
	errors: {
		rowUpdateError: 'حصل خطأ أثناء حفظ التعديلات، يرجى المحاولة لاحقاً.',
		noDataSpecified: '-',
		noListLoaded: `حصل خطأ أثناء جلب المعطيات، يرجى المحاولة لاحقاً.`,
	},
	footer: {
		rowsPerPage: 'عدد الأسطر في الصفحة:',
		pageCounter: (from: number, to: number, total: number) => `${from}-${to} من ${total}`,
	},
	columns: {
		status: 'الحالة',
		id: 'المعرف',
		userName: 'اسم المستخدم',
		fullName: 'الاسم الكامل',
		emailAddress: 'البريد الالكتروني',
		roles: 'الأدوار',
		lastLogin: 'آخر تسجيل دخول',
		creation: 'تاريخ الانضمام',
		actions: {
			menuTitle: 'إدارة المستخدم',
		},
	},
	fields: {
		columnSelector: {
			noOptionsText: 'لم يتم العثور على حقول تطابق عملية البحث',
			tooltip: 'اختيار الحقول',
			placeholder: 'عنوان الحقل',
			hideAllLabel: 'إخفاء الكل',
			showAllLabel: 'إظهار الكل',
		},
		search: {
			tooltip: 'بحث',
			placeholder: 'ابحث عن مستخدمين',
		},
	},
	edit,
}
