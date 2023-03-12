import { IBasicField } from '@forms/components/IBasicField'
import { CheckBoxProps } from '@admixltd/admix-component-library'
import { CSSProperties, ReactElement } from 'react'

export interface ICheckBox extends IBasicField {
	type: 'CheckBox'
	props?: CheckBoxProps & {
		label: ReactElement | string
		labelStyles?: CSSProperties
	}
}
