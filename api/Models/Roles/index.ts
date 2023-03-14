import apiPrefixes from '@constants/apiPrefixes'
import { Body, FilteredResult } from '@api/Types/FilteredTable'
import request from '@api/Methods/Request'
import { Role } from './types'

const get = (queryParams?: string) =>
	request<Body<Role>, FilteredResult<Role>>(`${apiPrefixes.roles}/GetAll?${queryParams ?? ''}`)

export default { get }
