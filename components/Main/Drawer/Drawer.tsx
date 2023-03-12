import { Button, DrawerBase } from '@admixltd/admix-component-library'
import { FC, HTMLAttributes, ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'
import DrawerAtom, { DrawerCookieName } from '@atoms/Drawer'
import { setCookie } from 'cookies-next'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Box, buttonClasses } from '@mui/material'
import LabelsAtom from '@atoms/Labels'
import { ILabels } from '@labels'
import classnames from 'classnames'
import { DrawerContentItem } from '@components/Main/Drawer/types'
import NestedItem from '@components/Main/Drawer/NestedItem'
import pages from '@constants/pages'

const contentToElement = (
	ContentDescription: DrawerContentItem[],
	{
		key: parentKey = '',
		labels,
		easing,
	}:
		| {
				key?: string
				labels?: ILabels[keyof ILabels]['drawer']
				easing?: string
		  }
		| undefined = {}
) => {
	const result: ReactElement[] = []
	ContentDescription.forEach((item, index) => {
		const key = `${parentKey}drawer-item-${index}`
		if ('component' in item) {
			result.push(<Box key={key} {...item} />)
		}
		if ('active' in item) {
			const { active, title, ...props } = item
			result.push(
				<Button
					key={key}
					active={active}
					{...props}
					className={classnames(props.className, {
						active,
					})}
				>
					{title}
				</Button>
			)
		}
		if ('items' in item) {
			const { items } = item
			result.push(
				<NestedItem easing={easing} key={key} {...item}>
					{contentToElement(items, { labels, key, easing })}
				</NestedItem>
			)
		}
	})

	return result
}

const Drawer: FC<Partial<HTMLAttributes<HTMLDivElement>>> = props => {
	const router = useRouter()
	const labels = useRecoilValue(LabelsAtom).drawer
	const {
		easing,
		drawer: { collapsedWidth, expandedWidth },
	} = useTheme()

	const [drawerOpened, setDrawerOpened] = useRecoilState(DrawerAtom)

	useEffect(() => {
		/**
		 * Save opened state in cookie
		 */
		setCookie(DrawerCookieName, drawerOpened)
	}, [drawerOpened])

	const [loading, setLoading] = useState(false)
	const [nextRoute, setNextRoute] = useState('')
	useEffect(() => {
		/**
		 * Shine loading effect on click
		 */
		const handleRouteChange = (url: string) => {
			setNextRoute(url)
		}

		const handleRouteComplete = () => {
			setLoading(false)
			handleRouteChange('')
		}

		router.events.on('routeChangeStart', handleRouteChange)
		router.events.on('routeChangeComplete', handleRouteComplete)
		router.events.on('routeChangeError', handleRouteComplete)
		return () => {
			router.events.off('routeChangeStart', handleRouteChange)
			router.events.off('routeChangeComplete', handleRouteComplete)
			router.events.off('routeChangeError', handleRouteComplete)
		}
	}, [])

	const baseProps = ({
		url,
		condition = 'startsWith',
	}: {
		url: string
		condition?: 'startsWith' | 'equal'
	}) => {
		/**
		 * Generate basic props for links based on url
		 */
		let active = router.pathname === url
		let shineLoading = nextRoute === url
		if (condition === 'startsWith') {
			active = router.pathname.startsWith(url)
			shineLoading = nextRoute.startsWith(url)
		}

		return {
			active,
			disabled: false,
			onClick: () => {
				if (loading) return
				setLoading(true)
				router.push(url)
			},
			shineLoading: loading && shineLoading,
		}
	}

	const DrawerContent: DrawerContentItem[] = [
		{ component: Title, children: 'Admin' },
		{
			...baseProps({ url: pages.dashboard.url, condition: 'equal' }),
			title: labels.overview,
		},
	]

	return (
		<DrawerBase
			{...props}
			{...{
				collapsedTitle: labels.collapsedTitle,
				open: drawerOpened,
				collapsedWidth,
				expandedWidth,
				onOpen: () => {
					setDrawerOpened(true)
				},
			}}
		>
			<Container>
				<div>{contentToElement(DrawerContent, { labels, easing })}</div>
			</Container>
		</DrawerBase>
	)
}

const Title = styled.div`
	font-weight: 600;
	font-size: 12px;
	line-height: 15px;
	display: flex;
	align-items: center;
	letter-spacing: 1px;
	color: ${({ theme }) => theme.colors.gray600};
	padding: 2px 14px;
	margin-bottom: 7px;
`

const Container = styled.div`
	padding: 16px;
	display: flex;
	flex-grow: 2;
	flex-direction: column;
	justify-content: space-between;

	> div {
		display: grid;
		gap: 4px;
		align-content: start;

		&:first-of-type {
			flex-grow: 2;
		}

		&:last-of-type {
			padding-top: 4px;
		}
	}

	&& {
		.${buttonClasses.root} {
			letter-spacing: normal;
			width: 100%;
			justify-content: flex-start;
			padding: 3px 14px;

			&:not(.active):not(.collapseToggle) {
				> div span {
					font-weight: 500;
					color: ${({ theme }) => theme.colors.gray800};
				}
			}
		}
	}
`

export default Drawer
