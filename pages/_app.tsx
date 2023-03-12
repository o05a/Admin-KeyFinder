import { CssBaseline } from '@mui/material'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import NProgress from 'nprogress'
import Router from 'next/router'
import { Global } from '@emotion/react'
import { SnackbarProvider } from 'notistack'
import theme from 'styles/theme'
import GlobalStyles from 'styles/global'
import { WithRouterProps } from 'next/dist/client/with-router'
import labels, { ILabels } from '@labels'
import LabelsAtom from '@atoms/Labels'
import Meta from '@components/Layouts/Meta'
import { RecoilNexus, resetRecoil, setRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import { SnackbarUtilsConfigurator } from '@admixltd/admix-component-library/Snackbar'
import { AdmixThemeProvider } from '@admixltd/admix-component-library'
import { SessionProvider as AuthProvider } from 'next-auth/react'
import RouterNexus from '@helpers/RouterNexus'
import SessionController from '@helpers/SessionController'
import ignoreRecoilErrors from '@utils/basic/ignoreRecoilErrors'
import { LazyMotion } from 'framer-motion'
import { BASE_PATH } from '@constants/envs'
import { AppPropsWithLayout } from '@interfaces/NextPage'
import BreadCrumbAtom from '@atoms/BreadCrumb'
import { useEffect } from 'react'
import DrawerAtom from '@atoms/Drawer'
import { ServerSideBaseProps } from '@helpers/withServerSideBaseProps'
import ModalProvider from 'mui-modal-provider'
import HooksNexus from '@helpers/HooksNexus'

/**
 * Fix for annoying recoil messages
 * because of hot module replacement on development mode
 */
ignoreRecoilErrors()

/**
 * Show line on top of the page on loading
 * between screens
 */
let timeout: ReturnType<typeof setTimeout>
NProgress.configure({ showSpinner: false })
Router.events.on(`routeChangeStart`, () => {
	clearTimeout(timeout)
	timeout = setTimeout(() => {
		NProgress.start()
	}, 300)
})
Router.events.on(`routeChangeComplete`, () => {
	clearTimeout(timeout)
	NProgress.done()
})
Router.events.on(`routeChangeError`, () => {
	clearTimeout(timeout)
	NProgress.done()
})

const refetchInterval = Number(process.env.NEXT_PUBLIC_SESSION_REFETCH_INTERVAL ?? 120)
const basePath = process.env.NEXT_PUBLIC_NEXTAUTH_URL ?? `${BASE_PATH}/api/auth`

export default function MyApp({
	Component,
	pageProps,
	router,
}: AppPropsWithLayout & WithRouterProps) {
	const { session, drawerOpened } = (pageProps as ServerSideBaseProps['props']) ?? {}
	const currentLocale = (router.locale ?? 'en') as keyof ILabels

	const getLayout = Component.getLayout ?? (page => page)
	const { recoilSetter, breadCrumb } = Component

	/**
	 * Update recoil on client-side
	 */
	useEffect(() => {
		if (recoilSetter)
			recoilSetter(
				{ set: setRecoil, reset: resetRecoil } as MutableSnapshot,
				pageProps,
				router
			)
	}, [recoilSetter, router, pageProps])

	useEffect(() => {
		if (!breadCrumb) resetRecoil(BreadCrumbAtom)
		if (breadCrumb) setRecoil(BreadCrumbAtom, breadCrumb(pageProps))
	}, [breadCrumb, router, pageProps])

	return (
		<AdmixThemeProvider theme={theme}>
			<RouterNexus />
			<CssBaseline />
			<Global styles={GlobalStyles({ theme })} />
			<AuthProvider
				{...{
					refetchInterval,
					session,
					basePath,
				}}
				refetchOnWindowFocus
			>
				<SessionController />
				<RecoilRoot
					initializeState={mutableSnapshot => {
						const { set } = mutableSnapshot
						set(LabelsAtom, labels[currentLocale])
						set(DrawerAtom, !!drawerOpened)
						if (breadCrumb) set(BreadCrumbAtom, breadCrumb(pageProps))
						if (recoilSetter) recoilSetter(mutableSnapshot, pageProps, router)
					}}
				>
					<ModalProvider>
						<RecoilNexus />
						{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment       */}
						{/* @ts-ignore https://github.com/iamhosseindhv/notistack/issues/485 */}
						<SnackbarProvider
							maxSnack={10}
							hideIconVariant
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
						>
							<Meta />
							<SnackbarUtilsConfigurator />
							<LazyMotion
								features={() =>
									import('@utils/motion/domAnimation').then(res => res.default)
								}
								strict
							>
								{getLayout(<Component {...pageProps} key={router.route} />)}
							</LazyMotion>
							<HooksNexus />
						</SnackbarProvider>
					</ModalProvider>
				</RecoilRoot>
			</AuthProvider>
		</AdmixThemeProvider>
	)
}
