import apiPrefixes from '@constants/apiPrefixes'
import { Body, FilteredResult } from '@api/Types/FilteredTable'
import request from '@api/Methods/Request'
import { RequestResponse } from '@api/Types/Request'
import { User } from './types'

const get = (queryParams?: string) =>
	request<Body<User>, FilteredResult<User>>(`${apiPrefixes.users}/GetAll${queryParams ?? ''}`)

const getOne = (id: string) =>
	request<Body<User>, FilteredResult<User>>(`${apiPrefixes.users}/Get?Id=${id}`)

const create = (body: Partial<User>) => {
	const { id, ...user } = body
	return request<Partial<User>, RequestResponse<User>>(`${apiPrefixes.users}/Create`, {
		returnBody: true,
		method: 'POST',
		data: { ...user },
	})
}

const activate = (id: number) =>
	request<Partial<User>, RequestResponse<User>>(`${apiPrefixes.users}/Activate`, {
		returnBody: true,
		method: 'POST',
		data: { id },
	})

const deActivate = (id: number) =>
	request<Partial<User>, RequestResponse<User>>(`${apiPrefixes.users}/DeActivate`, {
		returnBody: true,
		method: 'POST',
		data: { id },
	})

export default { get, getOne, create, activate, deActivate }
