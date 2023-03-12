import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Session } from 'next-auth'
import { getCookie } from 'cookies-next'
import { DrawerCookieName } from '@atoms/Drawer'
import withSession from '@helpers/withSession'
import { GetServerSidePropsContextWithSession } from '@api/Types/Request'

export interface ServerSideBaseProps extends GetServerSidePropsContext {
	props?: {
		session: Session
		drawerOpened: boolean
	}
}

/**
 * Universal getServerSideProps wrapper to prefetch all serverside data
 * like session or any cookie
 * Recommended using on any page
 * * * * * * * * * * *
 * export const getServerSideProps: GetServerSideProps = withServerSideBaseProps(
 *  async ({ req, props }: ServerSideBaseProps) => ({
 * 		console.log(props.session)
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
 * 				...props,
 * 			},
 * 		}
 * 	}
 * )
 */

const withServerSideBaseProps = (handler: GetServerSideProps) =>
	withSession(async ({ session, ...context }: GetServerSidePropsContextWithSession) => {
		const drawerOpened = !!getCookie(DrawerCookieName, context)
		return handler({
			...context,
			props: {
				session,
				drawerOpened,
			},
		} as ServerSideBaseProps)
	})

export default withServerSideBaseProps
