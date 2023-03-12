import { ChecksType } from '@forms/utils/checks/types'
import dayjs from 'dayjs'

const dateValid: ChecksType['dateValid'] = (value, options = {}) => {
	const { message = 'This date is invalid' } = options
	if (dayjs(`${value}`).isValid()) return
	return typeof message === 'string' ? message : message()
}

export default dateValid
