import BreadCrumbs from '@components/Main/BreadCrumbs/BreadCrumbs'
import styled from '@emotion/styled'
import { Button } from '@admixltd/admix-component-library'
import { ReactComponent as DrawerToggleIcon } from '@svg/AppBar/drawerToggle.svg'
import { useRecoilState } from 'recoil'
import DrawerAtom from '@atoms/Drawer'
import { useRouter } from 'next/router'
import { FC } from 'react'

const AppBar: FC = ({ ...props }) => {
	const router = useRouter()
	const [drawerOpened, setDrawerOpened] = useRecoilState(DrawerAtom)
	const locale = router.locale ?? 'en'
	return (
		<AppBarContainer {...props}>
			<LogoContainer>
				<Logo />
				<DrawerToggle
					color="gray500"
					icon={<DrawerToggleIcon />}
					onClick={() => {
						setDrawerOpened(!drawerOpened)
					}}
					className={drawerOpened ? `${locale}-drawerOpened` : `${locale}-drawerClosed`}
				/>
			</LogoContainer>
			<MainSection>
				<BreadCrumbs />
			</MainSection>
		</AppBarContainer>
	)
}

const DrawerToggle = styled(Button)`
	&&& {
		line-height: 1;
		padding: 8px;

		svg,
		img {
			width: 20px;
			height: 20px;
			display: block;
		}

		path {
			transition: all ${({ theme }) => theme.basicTransition};
			transition-delay: calc(var(--i) * 0.05s);
		}

		&.ar-drawerOpened {
			.drawerToggle_svg__ {
				&top,
				&bottom {
					transform: translateX(-6px);
				}

				&middle {
					transform: translateX(-9px);
				}

				&arrow {
					transform-origin: 18px;
					transform: translateX(12px) scaleX(-1);
				}
			}
		}

		.drawerToggle_svg__ {
			&top,
			&bottom {
				transform: translateX(6px);
			}

			&middle {
				transform: translateX(9px);
			}

			&arrow {
				transform-origin: 18px;
				transform: translateX(-12px) scaleX(-1);
			}
		}

		&.en-drawerOpened,
		&.ar-drawerClosed {
			.drawerToggle_svg__ {
				&top,
				&bottom {
					transform: translateX(0);
				}

				&middle {
					transform: translateX(0);
				}

				&arrow {
					transform-origin: 18px;
					transform: translateX(0) scaleX(1);
				}
			}
		}
	}
`
const Logo = styled(Button)`
	&&& {
		line-height: 1;
		padding: 8px;

		svg,
		img {
			width: 82px;
			height: 20px;
			display: block;
		}
	}
`

const LogoContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	justify-content: space-between;
	padding: 0 7px 0 16px;

	box-shadow: inset -1px 0px 0px ${({ theme }) => theme.colors.gray200};
`

const MainSection = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	padding: 0 24px;
`

const AppBarContainer = styled.div`
	min-height: ${({ theme }) => theme.appbar.height}px;
	align-items: center;
	display: grid;
	height: 100%;
	grid-template-columns: ${({ theme }) => theme.drawer.expandedWidth}px auto;
	background-color: ${({ theme }) => theme.colors.white};
	box-shadow: inset 0px -1px 0px ${({ theme }) => theme.colors.gray200};
`

export default AppBar
