import { GetServerSidePropsContextWithSession } from '@api/Types/Request'

export type RequestContextType = GetServerSidePropsContextWithSession

let requestContext: Partial<RequestContextType> = {}

const get = () => requestContext

const set = (newContext: Partial<RequestContextType>) => {
	requestContext = { ...requestContext, ...newContext }
}

export default {
	get,
	set,
}
