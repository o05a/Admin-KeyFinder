// noinspection JSValidateTypes

/** @type {import('next').NextConfig} */
const { withPlugins, optional } = require('next-compose-plugins')

const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ['en', 'ar'],
		defaultLocale: 'en',
	},
	future: {
		strictPostcssConfiguration: true,
	},
	/**
	 * Not needed for now
	 */
	experimental: {
		outputStandalone: true,
		// externalDir: true
	},
	eslint: {
		/**
		 * Warning: Dangerously allow production builds to successfully complete even if
		 * your project has ESLint errors.
		 */
		ignoreDuringBuilds: true,
	},
	images: {
		disableStaticImages: true,
	},
	swcMinify: process.env.NODE_ENV === 'production',
	webpack: config => {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})

		config.module.rules.push({
			test: /\.(png|gif|svg)$/i,
			issuer: /\.[jt]sx?$/,
			loader: 'file-loader',
			options: {
				outputPath: 'static/images/',
			},
		})

		return config
	},
}


const noRecoilMessagesOnDevelopment = ( nextConfig ) => {
	if (process.env.NODE_ENV === 'development'){
		require('intercept-stdout')((text) => (text.includes('Duplicate atom key') ? '' : text))
	}
	return { ...nextConfig }
}

const plugins = [
	optional(() => {
		if (process.env.ANALYZE !== 'True') return {}
		return require('@next/bundle-analyzer')()
	}),
	noRecoilMessagesOnDevelopment,
]

module.exports = withPlugins(plugins, nextConfig)

