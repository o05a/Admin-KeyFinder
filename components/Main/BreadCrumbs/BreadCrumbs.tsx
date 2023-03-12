import { useRouter } from 'next/router'
import { useMemo } from 'react'
import pages, { Page } from '@constants/pages'
import url from '@utils/basic/url'
import { BreadCrumb, BreadCrumbs as ACLBreadCrumbs } from '@admixltd/admix-component-library'
import { useRecoilValue } from 'recoil'
import BreadCrumbAtom from '@atoms/BreadCrumb'

const getBreadCrumbs = (items: typeof pages, routePaths: string[], deep = 0, parentPath = '') => {
	let collectedRoute: Array<Page> = []
	Object.values(items).forEach(item => {
		if (collectedRoute.length !== 0) return
		if (!item) return
		if (item.url === url(`${parentPath}/${routePaths[deep]}`)) {
			collectedRoute.push(item)
		}
	})

	if (collectedRoute[0]) {
		const route = collectedRoute[0] as typeof pages[keyof typeof pages]
		if ('children' in route) {
			const breadcrumbsFromChild = getBreadCrumbs(
				route.children as unknown as typeof pages,
				routePaths,
				deep + 1,
				route.url
			)
			collectedRoute = [...collectedRoute, ...breadcrumbsFromChild]
		}
	}
	return collectedRoute.filter(item => !!item.breadCrumb)
}

const BreadCrumbs = () => {
	const router = useRouter()
	const extraBreadCrumb = useRecoilValue(BreadCrumbAtom)
	const routePaths = router.pathname.split('/').filter(p => !!p)

	const collected = useMemo(
		() => [pages.dashboard, ...getBreadCrumbs(pages, routePaths)],
		[router.locale, routePaths, pages]
	)

	const items = collected.map(
		item =>
			({
				title: item.breadCrumb ? item.breadCrumb() : '',
				onClick: (_, close) => {
					if (close) close()
					if (!item.url) return
					if (url(router.route) === item.url) return
					router.push(item.url)
				},
			} as BreadCrumb)
	)

	if (extraBreadCrumb) items.push(extraBreadCrumb)

	return (
		<ACLBreadCrumbs
			{...{
				items,
			}}
		/>
	)
}

export default BreadCrumbs
