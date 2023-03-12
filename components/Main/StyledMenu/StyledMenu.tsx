import styled from '@emotion/styled'
import { buttonClasses } from '@mui/material'
import { FC, ReactNode } from 'react'

const StyledMenu: FC<{ children: ReactNode }> = ({ children }) => (
	<StyledMenuComponent>{children}</StyledMenuComponent>
)

const StyledMenuComponent = styled.div`
	&&& {
		user-select: none;
		padding: 0;
		min-width: 160px;

		.titleContainer {
			font-style: normal;
			font-weight: 500;
			font-size: 14px;
			line-height: 114%;
			color: ${({ theme }) => theme.colors.gray500};
			padding: 12px 16px;
		}

		.menuGroup {
			display: grid;

			.${buttonClasses.root} {
				font-weight: 500;
				font-size: 14px;
				line-height: 114%;
				color: ${({ theme }) => theme.colors.gray900};
				padding-top: 10px;
				padding-bottom: 10px;

				.${buttonClasses.startIcon} {
					svg {
						height: 20px;
						width: 20px;

						[stroke] {
							stroke: ${({ theme }) => theme.colors.gray500};
						}

						[fill] {
							fill: ${({ theme }) => theme.colors.gray500};
						}
					}
				}

				outline: none;
				justify-content: flex-start;
				width: 100%;
				border-radius: 0;
				box-shadow: none;
			}
		}
	}
`
export default StyledMenu
