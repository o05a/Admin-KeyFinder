import { ChecksType } from '@forms/utils/checks/types'

const required: ChecksType['required'] = (value, options = {}) => {
	if (typeof value === 'boolean') return
	const { message = 'Please fill it out' } = options
	const error = typeof message === 'string' ? message : message()
	if (Array.isArray(value) && value.length === 0) return error
	if (!value) return error
}

export default required
