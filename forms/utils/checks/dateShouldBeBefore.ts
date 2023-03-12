import { ChecksType } from '@forms/utils/checks/types'
import dayjs from 'dayjs'

const dateShouldBeBefore: ChecksType['dateShouldBeBefore'] = (value, options = {}) => {
	const { value: date } = options
	const { message = `This date should be before ${date}` } = options
	if (dayjs(`${value}`).isBefore(dayjs(date as string))) return
	return typeof message === 'string' ? message : message(date)
}

export default dateShouldBeBefore
