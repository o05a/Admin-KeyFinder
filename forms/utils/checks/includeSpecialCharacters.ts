import { ChecksType } from '@forms/utils/checks/types'
import pluralize from 'pluralize'

const includeSpecialCharacters: ChecksType['includeSpecialCharacters'] = (value, options = {}) => {
	const regExp = /[a-z0-9]/g
	const specialCharsCount = (value as string).replace(regExp, '').length
	const { value: count = 1 } = options
	if (specialCharsCount >= count) return
	const {
		message = `Please add ${value} special ${pluralize(
			'symbol',
			Number(Number(count) - specialCharsCount)
		)} or a capital ${pluralize('letter', Number(Number(count) - specialCharsCount))}`,
	} = options
	return typeof message === 'string' ? message : message(Number(count) - specialCharsCount)
}

export default includeSpecialCharacters
