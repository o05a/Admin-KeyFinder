import { Validators } from '@forms'
import pluralize from 'pluralize'

export default {
	arrayMin: value => `يجب اختيار ${value} خيارات على الأقل`,
	digitsOnly: 'يجب استخدام الأعداد فقط',
	email: 'يرجى إدخال بريد الكتروني ذو صيغة صحيحة',
	includeDigits: value => `يجب استخدام ${value} أرقام على الأقل`,
	includeSpecialCharacters: value =>
		`Please add ${value} special ${pluralize('symbol', Number(value))} or a capital ${pluralize(
			'letter',
			Number(value)
		)}`,
	maxLength: value => `يجب أن تكون القيمة بطول ${value} محارف على الأكثر`,
	maxValue: value => `يجب إدخال قيمة أصغر من ${value}`,
	minLength: value => `يجب أن تكون بطول ${value} محارف على الأقل`,
	minValue: value => `يجب إدخال قيمة أكبر من ${value}`,
	positiveDigitsOnly: 'يجب استخدام الأعداد الموجبة فقط',
	required: `يجب تعبئة هذا الحقل`,
	dateValid: 'هذا التاريخ غير صالح',
	dateShouldBeBefore: value => `يجب أن يكون التاريخ قبل ${value}`,
	dateShouldBeAfter: value => `يجب أن يكون التاريخ بعد ${value}`,
} as {
	[key in Validators]: string | ((value?: string | number) => string)
}
