import { FC, PropsWithChildren } from 'react'
import styled from '@emotion/styled'
import Drawer from '@components/Main/Drawer/Drawer'
import { css, Global, useTheme } from '@emotion/react'
import { AnimatePresence } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import DrawerAtom from '@atoms/Drawer'

const containerPadding = 24

const WithDrawer: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const {
		colors,
		drawer: { collapsedWidth, expandedWidth },
	} = useTheme()

	const drawerOpened = useRecoilValue(DrawerAtom)

	return (
		<StyledLayout>
			<Global
				styles={css`
					body {
						background-color: ${colors.gray100};
					}
				`}
			/>

			<DrawerContainer
				style={{
					width: drawerOpened ? expandedWidth : collapsedWidth,
				}}
			>
				<Drawer className="Drawer" />
			</DrawerContainer>
			<div className="Content">
				<AnimatePresence mode="wait" initial={false}>
					{children}
				</AnimatePresence>
			</div>
		</StyledLayout>
	)
}

const StyledLayout = styled.div`
	min-height: 100%;
	display: flex;
	flex-grow: 2;
	height: 100%;

	.Content {
		flex-grow: 2;
		display: flex;
		flex-direction: column;
		position: relative;

		width: 100%;
		padding-left: ${({ theme }) => theme.drawer.collapsedWidth}px;
		max-width: calc(100vw - ${({ theme }) => theme.drawer.expandedWidth + 1 + 17}px);

		padding: 8px ${containerPadding}px 0;
		margin: 0 auto;

		.motionContainer {
			height: 100%;
			flex-grow: 2;
			display: flex;
			flex-direction: column;
			position: relative;
		}
	}
`

const DrawerContainer = styled.div`
	transition: ${({ theme }) => theme.basicTransition};

	.Drawer {
		z-index: 9;
		position: fixed;
		height: calc(100% - ${({ theme }) => theme.appbar.height}px);
	}
`

export default WithDrawer
