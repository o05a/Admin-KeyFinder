import url from '@utils/basic/url'
import { SomeObject } from '@admixltd/admix-component-library'
import getLabels from '@helpers/getLabels'

export interface Page {
	url: string
	redirect?: string
	protected?: boolean
	breadCrumb?: (condition?: boolean) => string
}

const pages = {
	login: {
		...({
			protected: false,
			url: url('/login'),
		} as Page),
	},
	dashboard: {
		...({
			breadCrumb: () => getLabels().pages.dashboard.breadCrumb,
			url: url('/'),
		} as Page),
	},
	users: {
		...({
			breadCrumb: () => getLabels().pages.users.breadCrumb,
			url: url('/users'),
		} as Page),
	},
}

export interface PageObject extends Page {
	children?: SomeObject<PageObject>
}

export const findPage: (
	path: string,
	pagesObject?: SomeObject<PageObject>
) => PageObject | undefined = (path, pagesObject = {}) => {
	const rootPages = Object.values(pagesObject)
	const currentUrl = url(path)

	let result: PageObject | undefined
	try {
		rootPages.forEach(page => {
			// eslint-disable-next-line
			if (result) throw {}
			if ('url' in page && page.url === currentUrl) {
				result = page
				return
			}
			if ('children' in page) {
				result = findPage(path, page.children)
			}
		})
		// eslint-disable-next-line
	} catch {
		/**
		 * Break forEach
		 */
	}
	return result
}

export default pages
