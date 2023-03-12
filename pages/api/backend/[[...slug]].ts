import httpProxyMiddleware from 'next-http-proxy-middleware'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) =>
	httpProxyMiddleware(req, res, {
		target: process.env.API_URL,
		pathRewrite: [
			{
				patternStr: `^${process.env.NEXT_PUBLIC_API_MIDDLEWARE_PREFIX ?? '/api'}`,
				replaceStr: '',
			},
		],
	})
