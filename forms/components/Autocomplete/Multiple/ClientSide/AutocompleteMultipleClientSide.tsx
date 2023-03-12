import { IField } from '@forms/generate/types/IField'
import { IAutocompleteMultipleClientSideField } from '@forms/components/Autocomplete/Multiple/ClientSide/IAutocompleteMultipleClientSideField'
import { AutoComplete } from '@admixltd/admix-component-library/AutoComplete'
import { FC } from 'react'
import { IFieldValue } from '@forms/generate/types/IFieldValue'
import { SomeObject, uniqBy } from '@admixltd/admix-component-library'

const AutocompleteMultipleClientSide: FC<IField> = ({
	field,
	index,
	handleChange,
	value = [],
	error,
	extraProps = {},
}) => {
	field = field as IAutocompleteMultipleClientSideField

	const {
		props: { options, creatable, ...props },
		name,
		inputProps,
	} = field

	return (
		<AutoComplete<SomeObject, true>
			{...(extraProps.autocomplete as typeof props)}
			{...props}
			multiple
			disableCloseOnSelect
			options={options ?? []}
			key={`${name}_${index}`}
			name={name}
			value={value as Array<SomeObject>}
			inputProps={{ ...extraProps.input, ...inputProps, error }}
			onChange={async (event, newValue, reason) => {
				if (reason === 'createOption') {
					if (!creatable) return
					const { titleKey = 'title' } = props
					newValue = uniqBy(
						newValue.map(item => {
							if (typeof item === 'string')
								return {
									[titleKey]: item,
								}
							return item
						}),
						titleKey
					)
				}
				handleChange(name ?? '', newValue as unknown as IFieldValue)
			}}
		/>
	)
}

export default AutocompleteMultipleClientSide
