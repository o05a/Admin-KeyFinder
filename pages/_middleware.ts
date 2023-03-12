import { withAuth } from 'next-auth/middleware'
import pages, { findPage, PageObject } from '@constants/pages'
import dayjs from 'dayjs'
import { NextMiddleware } from 'next/dist/server/web/types'
import { NextRequest, NextResponse } from 'next/server'
import { absolute } from '@utils/basic/url'

interface NextRequestWithProps extends NextRequest {
	props: {
		page?: PageObject
	}
}

const middleware: NextMiddleware = async req => {
	const next = NextResponse.next()
	const { page } = (req as NextRequestWithProps).props ?? {}
	if (page?.redirect) return NextResponse.redirect(absolute(page.redirect))
	return next
}

export default withAuth(middleware, {
	callbacks: {
		authorized: ({ token, req }) => {
			let authorized = true
			const page = findPage(req.page.name ?? req.nextUrl.pathname, pages)
			;(req as NextRequestWithProps).props = { page }
			if (!page) return authorized

			const { accessTokenExpires } = token ?? {}
			const pageProtected = page.protected !== false

			if (pageProtected) {
				if (!accessTokenExpires) {
					authorized = false
				}
				if (dayjs().isAfter(accessTokenExpires)) {
					authorized = false
				}
			}
			return authorized
		},
	},
})
