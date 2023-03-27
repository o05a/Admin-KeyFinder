import NextAuth, { CallbacksOptions, DefaultSession, DefaultUser, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextApiRequest, NextApiResponse } from 'next'
import pages from '@constants/pages'
import dayjs, { Dayjs } from 'dayjs'
import Auth from '@api/Models/Auth'
import { HOSTNAME } from '@constants/envs'
import requestContext from '@helpers/requestContext'
import getLabels from '@helpers/getLabels'

declare module 'next-auth' {
	interface User extends DefaultUser {
		accessToken?: string
		expired?: boolean
		userId: string
		accessTokenExpires: Dayjs
	}
}

declare module 'next-auth' {
	interface Session extends Omit<DefaultSession, 'user'> {
		accessToken?: string
		expired?: boolean
		userId: string
		accessTokenExpires: Dayjs
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken?: string
		expired?: boolean
		userId: string
		accessTokenExpires: Dayjs
	}
}

const providers = [
	CredentialsProvider({
		credentials: {
			userNameOrEmailAddress: { label: 'Username', type: 'text' },
			password: { label: 'Password', type: 'password' },
			remember: { label: 'Remember', type: 'checkbox' },
		},
		name: 'Credentials',
		authorize: async credentials => {
			const { userNameOrEmailAddress, password, remember } = credentials as unknown as {
				userNameOrEmailAddress: string
				password: string
				remember: boolean
			}

			const loginResponse = await Auth.login({
				userNameOrEmailAddress,
				password,
			})

			console.log('loginResponse', loginResponse)

			if (!loginResponse) {
				throw new Error(getLabels().errors.nextauth.NoLoginResponse)
			}

			if ('error' in loginResponse) {
				const { error } = loginResponse
				console.log('loginError', error)
				throw new Error(error ?? getLabels().errors.nextauth.loginError)
			}

			const { accessToken, userId, expireInSeconds } = loginResponse

			let days = 1
			if (String(remember) === 'true') {
				days = expireInSeconds / 60 / 60 / 24
			}
			const accessTokenExpires = dayjs().add(days, 'days')
			const expired = dayjs().isAfter(accessTokenExpires)

			/**
			 * Prefill context with base session parts
			 * to check user permissions
			 */
			requestContext.set({
				session: {
					accessToken,
					expired,
					userId,
					accessTokenExpires,
				} as Session,
			})

			return {
				accessToken,
				expired,
				userId,
				accessTokenExpires,
			} as User
		},
	}),
]

const callbacks: Partial<CallbacksOptions> = {
	/**
	 * Getting the JWT token from API response
	 */
	async jwt(params) {
		const { user, token } = params
		if (user) {
			token.accessToken = user.accessToken
			token.accessTokenExpires = user.accessTokenExpires
			token.userId = user.userId
			token.expired = user.expired
		}
		return token
	},
	async session({ session, token }) {
		if (token) {
			session.accessToken = token.accessToken
			session.accessTokenExpires = token.accessTokenExpires
			session.userId = token.userId
			session.expired = token.expired
		}
		return session
	},
	async redirect({ url, baseUrl }) {
		try {
			if (url.startsWith('/')) return `${HOSTNAME ?? baseUrl}${decodeURIComponent(url)}`
			if (!/^((http|https):\/\/)/.test(url)) url = `https://${url}`
			const { href, origin } = new URL(url)
			return decodeURIComponent(href).replaceAll(origin, HOSTNAME ?? baseUrl)
		} catch (e) {
			return baseUrl
		}
	},
}

export default (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, {
		providers,
		pages: {
			signIn: pages.login.url,
			error: pages.login.url,
		},
		debug: process.env.NODE_ENV === 'development',
		callbacks,
		session: {
			strategy: 'jwt',
		},
		secret: process.env.NEXTAUTH_SECRET,
	})
