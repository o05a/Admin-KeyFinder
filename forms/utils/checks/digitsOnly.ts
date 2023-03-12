import { ChecksType } from '@forms/utils/checks/types'

const digitsOnly: ChecksType['digitsOnly'] = (value, options = {}) => {
	const { message = 'Please use digits only', allowEmpty = true } = options
	if (typeof value === 'number') return
	if (allowEmpty && !value) return
	if (!Number.isNaN(Number(value))) return
	return typeof message === 'string' ? message : message()
}

export default digitsOnly
