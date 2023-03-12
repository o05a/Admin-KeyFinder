import request from '@api/Methods/Request'
import apiPrefixes from '@constants/apiPrefixes'
import { LoginProps, LoginResponse } from './types'

const login = async (data: LoginProps) =>
	request<LoginProps, LoginResponse>(`${apiPrefixes.auth}`, {
		method: 'POST',
		authorization: false,
		data,
	})

export default { login }
