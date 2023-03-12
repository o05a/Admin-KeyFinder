import { ReactElement } from 'react'
import { BoxProps } from '@mui/material'
import { IBasicField } from '@forms/components/IBasicField'
// eslint-disable-next-line import/no-cycle
import { IFieldVariant } from '@forms/generate/types/IFieldVariant'

export interface IBlock extends Partial<IBasicField> {
	type?: 'Block'
	content?: string | ReactElement
	component?: BoxProps['component']
	sections?: Array<IFieldVariant>
	props?: BoxProps
}
