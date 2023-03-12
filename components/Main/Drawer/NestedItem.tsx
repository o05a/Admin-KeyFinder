import { FC, PropsWithChildren, useState } from 'react'
import { Button } from '@admixltd/admix-component-library'
import { DrawerContentItem, NestedItemProps } from '@components/Main/Drawer/types'
import { Collapse, collapseClasses } from '@mui/material'
import styled from '@emotion/styled'
import { ReactComponent as Arrow } from '@svg/Drawer/arrowDown.svg'
import classnames from 'classnames'

const checkIfItemsActive: (items: DrawerContentItem[]) => boolean = items =>
	items.filter(item => {
		if ('items' in item) {
			return checkIfItemsActive(item.items)
		}
		if ('active' in item) {
			return item.active
		}
		return false
	}).length > 0

const NestedItem: FC<PropsWithChildren<NestedItemProps>> = ({
	title,
	items,
	expandDefaultIfSubItemActive = true,
	children,
	easing,
	toggleProps,
	...props
}) => {
	const defaultExpanded = checkIfItemsActive(items)
	const [open, setOpen] = useState(expandDefaultIfSubItemActive ? defaultExpanded : false)
	return (
		<Container {...props}>
			<Button
				className={classnames('collapseToggle', { open })}
				color="gray600"
				icon={<Arrow />}
				{...toggleProps}
				onClick={e => {
					setOpen(!open)
					if (!toggleProps) return
					if (!toggleProps.onClick) return
					toggleProps.onClick(e)
				}}
			>
				{title}
			</Button>
			<Collapse in={open} className="collapseContainer" easing={easing}>
				{children}
			</Collapse>
		</Container>
	)
}

const Container = styled.div`
	&&& {
		display: grid;
		gap: 4px;
		.${collapseClasses.wrapperInner} {
			display: grid;
			gap: 4px;
		}
		margin: 2px 0;
		.collapseToggle {
			font-style: normal;
			font-weight: 600;
			font-size: 12px;
			letter-spacing: 1px;
			line-height: 1.2;
			padding: 4px 10px;

			svg,
			img {
				width: 20px;
				height: 20px;
				transition: transform ${({ theme }) => theme.basicTransition};
			}

			&.open {
				svg,
				img {
					transform: scaleY(-1);
				}
			}
		}
	}
`

export default NestedItem
