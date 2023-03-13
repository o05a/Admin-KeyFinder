import { Validators } from '@forms'
import pluralize from 'pluralize'

export default {
	arrayMin: value => `Please select ${value} more ${pluralize('value', Number(value))}`,
	digitsOnly: 'يرجى استخدام الأعداد فقط',
	email: 'يرجى إدخال بريد الكتروني ذو صيغة صحيحة',
	includeDigits: value => `Please add ${value} ${pluralize('digit', Number(value))}`,
	includeSpecialCharacters: value =>
		`Please add ${value} special ${pluralize('symbol', Number(value))} or a capital ${pluralize(
			'letter',
			Number(value)
		)}`,
	maxLength: value => `Should be ${value} maximum ${pluralize('character', Number(value))} long`,
	maxValue: value => `يرجى إدخال قيمة أصغر من ${value}`,
	minLength: value => `يجب أن تكون بطول ${value} محارف على الأقل`,
	minValue: value => `يرجى إدخال قيمة أكبر من ${value}`,
	positiveDigitsOnly: 'يرجى استخدام الأعداد الموجبة فقط',
	required: `يرجى تعبئة هذا الحقل`,
	dateValid: 'هذا التاريخ غير صالح',
	dateShouldBeBefore: value => `يجب أن يكون التاريخ قبل ${value}`,
	dateShouldBeAfter: value => `يجب أن يكون التاريخ بعد ${value}`,
} as {
	[key in Validators]: string | ((value?: string | number) => string)
}
