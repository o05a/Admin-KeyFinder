import { Session } from 'next-auth'
import HTTPMethods from '@api/Types/HTTPMethods'
import { GetServerSidePropsContext } from 'next'

export interface RequestOptions {
	method: string
	headers: HeadersInit
	body?: string | FormData
}

export interface GetServerSidePropsContextWithSession extends GetServerSidePropsContext {
	session?: Session | null
}

export interface RequestProps<T> {
	/**
	 * Return non-cropped response
	 */
	returnBody?: boolean
	form?: boolean
	authorization?: boolean
	method?: HTTPMethods
	data?: T
}

export interface RequestResponse<T> {
	data?: T
	message?: string
	status?: boolean
}
