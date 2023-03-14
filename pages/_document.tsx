/* eslint-disable react/no-danger */
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import fontLoader from '@utils/basic/fontLoader'
import { BASE_PATH } from '@constants/envs'

const fontFile = `${BASE_PATH}/inter.css`
const fontFamily = `Inter`

export default class MyDocument extends Document {
	static async getInitialProps(context: DocumentContext) {
		const initialProps = await Document.getInitialProps(context)
		return { ...initialProps }
	}

	render() {
		const { locale } = this.props
		const dir = locale === 'ar' ? 'rtl' : 'ltr'
		return (
			<Html dir={dir}>
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
