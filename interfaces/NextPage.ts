import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { MutableSnapshot } from 'recoil'
import { AppProps } from 'next/app'
import { BreadCrumb, SomeObject } from '@admixltd/admix-component-library'
import { NextRouter } from 'next/router'

export type NextPageWithProps<P = SomeObject, IP = P> = NextPage<P, IP> & {
	/**
	 * Layout type
	 */
	getLayout?: (page: ReactElement) => ReactNode
	recoilSetter?: (
		mutableSnapshot: MutableSnapshot,
		pageProps: Partial<P>,
		router?: NextRouter
	) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	breadCrumb?: (pageProps: any) => BreadCrumb
}
export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithProps
}
