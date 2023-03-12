import { ChecksType } from '@forms/utils/checks/types'
import dayjs from 'dayjs'

const dateShouldBeAfter: ChecksType['dateShouldBeAfter'] = (value, options = {}) => {
	const { value: date } = options
	const { message = `This date should be after ${date}` } = options
	if (dayjs(`${value}`).isAfter(dayjs(date as string))) return
	return typeof message === 'string' ? message : message(date)
}

export default dateShouldBeAfter
