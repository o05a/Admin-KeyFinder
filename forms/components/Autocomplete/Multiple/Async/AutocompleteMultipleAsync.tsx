import { IField } from '@forms/generate/types/IField'
import { AutoComplete } from '@admixltd/admix-component-library/AutoComplete'
import { FC } from 'react'
import { SomeObject } from '@admixltd/admix-component-library'
import { IAutocompleteMultipleAsyncField } from './IAutocompleteMultipleAsyncField'

const AutocompleteMultipleAsync: FC<IField> = ({
	field,
	index,
	handleChange,
	value = [],
	error,
	extraProps = {},
}) => {
	field = field as IAutocompleteMultipleAsyncField

	const {
		props: { options, onChangeEventsHandlers, ...props },
		name,
		inputProps,
	} = field

	return (
		<AutoComplete<SomeObject, true>
			{...(extraProps.autocomplete as typeof props)}
			{...props}
			multiple
			async
			disableCloseOnSelect
			options={options ?? []}
			key={`${name}_${index}`}
			name={name}
			value={value as Array<SomeObject>}
			inputProps={{ ...extraProps.input, ...inputProps, error }}
			onChange={async (event, newValue, reason) => {
				if (onChangeEventsHandlers && onChangeEventsHandlers[reason]) {
					const update = await onChangeEventsHandlers[reason](
						value as Array<SomeObject>,
						newValue
					)
					if (update) handleChange(name ?? '', newValue)
				} else handleChange(name ?? '', newValue)
			}}
		/>
	)
}

export default AutocompleteMultipleAsync
