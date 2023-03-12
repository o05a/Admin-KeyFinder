import { ChecksType } from '@forms/utils/checks/types'
import pluralize from 'pluralize'

const arrayMin: ChecksType['arrayMin'] = (value, options = {}) => {
	const { value: minValue = -Infinity } = options
	if (!Array.isArray(value)) return
	if (value.length >= minValue) return
	const needed = Number(minValue) - value.length

	const { message = `Please select ${needed} more ${pluralize('value', Number(needed))}` } =
		options
	return typeof message === 'string' ? message : message(needed)
}
export default arrayMin
