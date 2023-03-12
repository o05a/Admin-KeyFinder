import { getSession } from 'next-auth/react'
import { GetServerSidePropsContextWithSession } from '@api/Types/Request'
import requestContext from '@helpers/requestContext'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

/**
 * Wrapper for getServerSideProps
 * * * * * * * * * *
 * export const getServerSideProps: GetServerSideProps = withSession(
 *  async ({ req, session }: GetServerSidePropsContextWithSession) => {
 * 		console.log(session)
 * 		const response = await Request('path', {
 * 			method: 'POST',
 * 		})
 *
 * 		if (response.redirect) {
 * 			return {
 * 				redirect: response.redirect,
 * 				props: {},
 * 			}
 * 		}
 *
 * 		return {
 * 			props: {
 * 				session,
 * 			},
 * 		}
 * 	}
 * )
 */
const withSession = (handler: GetServerSideProps) => async (context: GetServerSidePropsContext) => {
	const session = await getSession(context)
	requestContext.set({
		session,
		...context,
	})

	return handler({
		...context,
		session,
	} as GetServerSidePropsContextWithSession)
}

export default withSession
