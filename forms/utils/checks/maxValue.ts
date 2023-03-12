import digitsOnly from '@forms/utils/checks/digitsOnly'
import { ChecksType } from '@forms/utils/checks/types'

const maxValue: ChecksType['maxValue'] = (value, options = {}) => {
	const digitsCheck = digitsOnly(value)
	if (digitsCheck) return digitsCheck
	const { value: maximumValue = Infinity, allowEmpty = true } = options
	if (allowEmpty && !value) return
	if ((value as number) <= maximumValue) return

	const { message = `Please specify value less then ${maximumValue}` } = options
	return typeof message === 'string' ? message : message(maximumValue)
}
export default maxValue
