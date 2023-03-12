import { IField } from '@forms/generate/types/IField'
import { AutoComplete } from '@admixltd/admix-component-library/AutoComplete'
import { FC } from 'react'
import { SomeObject } from '@admixltd/admix-component-library'
import { IAutocompleteSingleAsyncField } from './IAutocompleteSingleAsyncField'

const AutocompleteSingleAsync: FC<IField> = ({
	field,
	index,
	handleChange,
	value = [],
	error,
	extraProps = {},
}) => {
	field = field as IAutocompleteSingleAsyncField

	const {
		props: { options, ...props },
		name,
		inputProps,
	} = field

	return (
		<AutoComplete<SomeObject, true>
			{...(extraProps.autocomplete as typeof props)}
			{...props}
			async
			options={options ?? []}
			key={`${name}_${index}`}
			name={name}
			value={value as Array<SomeObject>}
			inputProps={{ ...extraProps.input, ...inputProps, error }}
			onChange={async (event, newValue) => handleChange(name ?? '', newValue)}
		/>
	)
}

export default AutocompleteSingleAsync
