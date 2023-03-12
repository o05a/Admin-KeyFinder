import { FC } from 'react'
import { NumericInput as ACLNumericInput } from '@admixltd/admix-component-library/NumericInput'
import { IField } from '@forms/generate/types/IField'
import { INumericInputField } from '@forms/components/NumericInput/INumericInputField'
import { IFieldValue } from '@forms/generate/types/IFieldValue'

const NumericInput: FC<IField> = ({
	field,
	index,
	handleChange,
	value,
	error,
	extraProps = {},
}) => {
	field = field as INumericInputField
	const { name, props } = field
	const { max, formatter, ...otherProps } = props ?? {}

	if (max)
		otherProps.format = (val: string) => {
			if (val && +val > max) return `${max}`
			return val
		}

	if (formatter) value = formatter(value as string | number) as IFieldValue

	return (
		<ACLNumericInput
			{...extraProps.input}
			{...{
				type: 'tel',
				thousandSeparator: ' ',
			}}
			{...otherProps}
			key={`${name}_${index}`}
			name={name}
			value={(value ?? '') as string | number}
			error={error}
			onChange={e => handleChange(name ?? '', e.target.value)}
		/>
	)
}

export default NumericInput
