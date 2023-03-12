import { IBasicField } from '@forms/components/IBasicField'
import { SwitchProps } from '@admixltd/admix-component-library'
import { CSSProperties, ReactElement } from 'react'

export interface ISwitch extends IBasicField {
	type: 'Switch'
	props?: SwitchProps & {
		label: ReactElement | string
		labelStyles?: CSSProperties
	}
}
