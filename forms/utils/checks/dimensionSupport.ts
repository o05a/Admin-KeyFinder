import { ChecksType } from '@forms/utils/checks/types'

const dimensionSupport: ChecksType['dimensionSupport'] = (value, options = {}) => {
	if (!value) return
	if (!Array.isArray(value)) return
	const {
		message = 'Please make sure the images dimensions are supported',
		value: supportedDimensions = [],
	} = options
	const nonSupported = value.filter(
		image => !(supportedDimensions as string[]).includes(image.dimension)
	)
	if (!nonSupported.length) return
	return typeof message === 'string' ? message : message()
}

export default dimensionSupport
