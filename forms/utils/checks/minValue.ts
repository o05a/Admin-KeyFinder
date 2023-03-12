import digitsOnly from '@forms/utils/checks/digitsOnly'
import { ChecksType } from '@forms/utils/checks/types'

const minValue: ChecksType['minValue'] = (value, options = {}) => {
	const digitsCheck = digitsOnly(value)
	if (digitsCheck) return digitsCheck
	const { value: minimumValue = -Infinity, allowEmpty = true } = options
	if (allowEmpty && !value) return
	if ((value as number) >= minimumValue) return

	const { message = `Please specify value more then ${minimumValue}` } = options
	return typeof message === 'string' ? message : message(minimumValue)
}

export default minValue
