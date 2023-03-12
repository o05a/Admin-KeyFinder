import minValue from './minValue'
import arrayMin from './arrayMin'
import maxValue from './maxValue'
import minLength from './minLength'
import digitsOnly from './digitsOnly'
import email from './email'
import positiveDigitsOnly from './positiveDigitsOnly'
import includeDigits from './includeDigits'
import { ChecksType } from './types'
import includeSpecialCharacters from './includeSpecialCharacters'
import maxLength from './maxLength'
import required from './required'
import dateValid from './dateValid'
import dateShouldBeAfter from './dateShouldBeAfter'
import dateShouldBeBefore from './dateShouldBeBefore'
import dimensionSupport from './dimensionSupport'

const checks: ChecksType = {
	email,
	includeDigits,
	includeSpecialCharacters,
	minLength,
	maxLength,
	required,
	digitsOnly,
	positiveDigitsOnly,
	arrayMin,
	maxValue,
	minValue,
	dateValid,
	dateShouldBeAfter,
	dateShouldBeBefore,
	dimensionSupport,
	someLongCheck: async () => {
		await new Promise(r => {
			setTimeout(r, 2000)
		})
	},
}

export default checks
