/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidatorsDefinition } from '@forms/utils/checks/types'
import { IHandleChange } from '@forms/generate/types/IField'
import { IFieldVariant } from '@forms/generate/types/IFieldVariant'
import { IFieldError } from '@forms/generate/types/IFieldError'
import { IExtraProps } from '@forms/generate/types/IExtraProps'

export interface IFieldWrapper {
	name: string
	type: string
	dataPrefix?: string
	field: IFieldVariant
	index: number
	subIndex?: number
	globalOnChange?: IHandleChange
	onChange?: IHandleChange
	validators?: ValidatorsDefinition[]
	customErrorListener?: string[]
	key: string
	parentError: IFieldError
	extraProps?: IExtraProps
}
