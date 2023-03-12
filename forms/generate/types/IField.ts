import { IFieldVariant } from '@forms/generate/types/IFieldVariant'
import { IFieldValue } from '@forms/generate/types/IFieldValue'
import { IFieldError } from '@forms/generate/types/IFieldError'
import { IExtraProps } from '@forms/generate/types/IExtraProps'

export type IHandleChange = {
	(name: string, value: IFieldValue): void
}

export interface IField {
	field: IFieldVariant
	/**
	 * Used for nested components
	 */
	index?: number
	key?: string
	dataPrefix?: string
	name: string
	value: IFieldValue
	error?: IFieldError
	handleChange: IHandleChange
	extraProps?: IExtraProps
}
