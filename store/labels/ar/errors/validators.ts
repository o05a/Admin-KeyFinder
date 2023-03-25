import { Validators } from '@forms'
import pluralize from 'pluralize'

export default {
	arrayMin: value => `Please select ${value} more ${pluralize('value', Number(value))}`,
	digitsOnly: 'Please use digits only',
	email: 'Please enter a valid email',
	includeDigits: value => `Please add ${value} ${pluralize('digit', Number(value))}`,
	includeSpecialCharacters: value =>
		`Please add ${value} special ${pluralize('symbol', Number(value))} or a capital ${pluralize(
			'letter',
			Number(value)
		)}`,
	maxLength: value => `Should be ${value} maximum ${pluralize('character', Number(value))} long`,
	maxValue: value => `Please specify value less then ${value}`,
	minLength: value => `Should be ${value} minimum characters long`,
	minValue: value => `Please specify value more then ${value}`,
	positiveDigitsOnly: 'Please use only positive numbers',
	required: `Please fill it out`,
	dateValid: 'This date is invalid',
	dateShouldBeBefore: value => `This date should be before ${value}`,
	dateShouldBeAfter: value => `This date should be after ${value}`,
} as {
	[key in Validators]: string | ((value?: string | number) => string)
}
