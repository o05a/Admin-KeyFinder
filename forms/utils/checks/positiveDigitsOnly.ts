import minValue from '@forms/utils/checks/minValue'
import { ChecksType } from '@forms/utils/checks/types'

const positiveDigitsOnly: ChecksType['positiveDigitsOnly'] = (value, options = {}) => {
	const { message = 'Please use only positive numbers' } = options
	const digitsCheck = minValue(value, {
		message,
		value: 0,
	})
	if (!digitsCheck) return
	if (message) return typeof message === 'string' ? message : message()
	return digitsCheck
}

export default positiveDigitsOnly
