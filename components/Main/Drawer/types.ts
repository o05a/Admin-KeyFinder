import { BoxProps } from '@mui/material'
import { ReactElement } from 'react'
import { ButtonProps } from '@admixltd/admix-component-library'

export type DrawerContentItem = BoxProps | ElementProps | NestedItemProps

export interface ElementProps extends ButtonProps {
	active: boolean
}

export interface NestedItemProps {
	toggleProps?: ButtonProps
	title: ReactElement
	easing?: string
	items: DrawerContentItem[]
	expandDefaultIfSubItemActive?: boolean
}
