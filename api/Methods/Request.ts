import { getSession, signOut } from 'next-auth/react'
import url from '@utils/basic/url'
import getQueryFromBody from '@utils/basic/getQueryFromBody'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import dayjs from 'dayjs'
import { getRouter } from 'helpers/RouterNexus'
import pages from '@constants/pages'
import { SomeObject } from '@admixltd/admix-component-library'
import { HOSTNAME } from '@constants/envs'
import { getClientSession } from '@helpers/SessionController'
import getLabels from '@helpers/getLabels'
import { RequestOptions, RequestProps } from '@api/Types/Request'
import requestContext from '@helpers/requestContext'

const request = async <T = SomeObject, P = SomeObject>(
	path: string,
	requestProps?: RequestProps<T>
) => {
	const {
		method = 'GET',
		data,
		form,
		authorization = true,
		returnBody = false,
	} = requestProps ?? {}

	/**
	 * This url is available only serverside
	 */
	const browser = !process.env.API_URL

	path = url(`${HOSTNAME}${process.env.NEXT_PUBLIC_API_MIDDLEWARE_PREFIX}${path}`)
	const requestUrl = new URL(path)

	/**
	 * For debug purposes
	 */
	// eslint-disable-next-line no-console
	if (process.env.NODE_ENV === 'development') console.log(`[${method}]`, requestUrl.href)

	const headers: HeadersInit = new Headers()
	headers.set('Accept', 'application/json')
	if (!form) headers.set('Content-Type', 'application/json')

	if (authorization) {
		/**
		 * Check every request with auth
		 */

		const { accessToken, accessTokenExpires } =
			requestContext.get().session ?? (await getClientSession()) ?? (await getSession()) ?? {}
		let error = ''

		if (!accessToken) error = getLabels().errors.request.AuthorizationError
		if (dayjs().isAfter(accessTokenExpires)) error = getLabels().errors.request.SessionExpired

		if (error) {
			if (browser) {
				signOut({
					redirect: false,
				})
				Snackbar.error(error)
				getRouter()?.push(pages.login.url)
			}
			return {
				error,
				redirect: {
					destination: pages.login.url,
					permanent: false,
				},
			}
		}
		headers.append('Authorization', `Bearer ${accessToken}`)
	}

	const options: RequestOptions = {
		headers,
		method,
	}

	if (data) {
		if (['GET', 'HEAD'].includes(method)) {
			requestUrl.search = getQueryFromBody(data as never)
		} else {
			options.body = !form ? JSON.stringify(data) : (data as unknown as FormData)
		}
	}

	const response = await fetch(requestUrl.toString(), options)

	let responseData

	try {
		responseData = await response.json()

		if (!response.ok || !responseData.success) {
			const { error } = responseData
			if (error) Snackbar.error(error)
			return {
				error,
			}
		}

		if (!returnBody) {
			const { result: receivedData } = responseData
			responseData = receivedData
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err)
	}
	return responseData as P
}

export default request
