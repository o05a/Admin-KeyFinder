/* eslint-disable react/no-danger */
import Document, { Head, Html, Main, NextScript } from 'next/document'
import fontLoader from '@utils/basic/fontLoader'
import { BASE_PATH } from '@constants/envs'
import { getRouter } from '@helpers/RouterNexus'

const fontFile = `${BASE_PATH}/inter.css`
const fontFamily = `Inter`

export default class MyDocument extends Document {
	render() {
		return (
			<Html dir={getRouter()?.locale === 'ar' ? 'rtl' : 'ltr'}>
				<Head>
					<script
						dangerouslySetInnerHTML={{
							/**
							 * Save font into localstorage for fast refresh
							 */
							__html: fontLoader({ fontFile, fontFamily }),
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
