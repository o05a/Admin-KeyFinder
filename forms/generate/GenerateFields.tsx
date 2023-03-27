import { ReactElement } from 'react'
import getFieldNames from '@forms/utils/getFieldNames'
import { IExtraProps } from '@forms/generate/types/IExtraProps'
import { IHandleChange } from './types/IField'
import { IFieldVariant } from './types/IFieldVariant'
import { IFieldError } from './types/IFieldError'
import { IFieldWrapper } from './types/IFieldWrapper'
import Field from './Field'

interface GenerateFieldsOptions {
	subIndex: number
	error: IFieldError
	onChange: IHandleChange
	dataPrefix: string
	/**
	 * Props that will be added to all fields
	 */
	extraProps?: IExtraProps
}

export interface GenerateFieldsResponse {
	fields: ReactElement | ReactElement[]
	names: string[]
}

const GenerateFields: (
	sections: IFieldVariant[] | IFieldVariant,
	options?: Partial<GenerateFieldsOptions>
) => GenerateFieldsResponse = (
	sections,
	{ subIndex, error = false, onChange, dataPrefix, extraProps = {} } = {}
) => {
	if (!Array.isArray(sections)) sections = [sections]
	const names = getFieldNames(sections, dataPrefix)
	const fields = sections.map((field: IFieldVariant, index: number) => {
		const {
			name,
			type = 'Block',
			validation,
			onChange: customOnChange,
			customErrorListener,
		} = field
		const key = `section-${typeof subIndex !== 'undefined' ? `${subIndex}-` : ''}${index}`

		const properties: IFieldWrapper = {
			extraProps,
			name: name ?? key ?? '',
			type,
			field,
			index,
			subIndex,
			key,
			parentError: error,
			globalOnChange: onChange,
			onChange: customOnChange,
			customErrorListener:
				typeof customErrorListener === 'string'
					? [customErrorListener]
					: customErrorListener,
			validators: validation,
			dataPrefix,
		}

		return <Field {...properties} />
	})

	return {
		fields,
		names,
	}
}

export default GenerateFields
