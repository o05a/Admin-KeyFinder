import { ChecksType } from '@forms/utils/checks/types'
import pluralize from 'pluralize'

const includeDigits: ChecksType['includeDigits'] = (value, options = {}) => {
	const regExp = /[^0-9]/g
	const { value: count = 1 } = options
	const digitsCount = (value as string).replace(regExp, '').length
	if (digitsCount >= count) return
	const {
		message = `Please add ${Number(count) - digitsCount} ${pluralize(
			'digit',
			Number(Number(count) - digitsCount)
		)}`,
	} = options
	return typeof message === 'string' ? message : message(Number(count) - digitsCount)
}

export default includeDigits
