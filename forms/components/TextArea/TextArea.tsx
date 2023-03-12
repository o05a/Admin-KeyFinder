import { FC } from 'react'
import { IField } from '@forms/generate/types/IField'
import { TextArea as ACLTextArea } from '@admixltd/admix-component-library'
import { ITextAreaField } from './ITextAreaField'

const TextArea: FC<IField> = ({ field, index, handleChange, value, error, extraProps = {} }) => {
	field = field as ITextAreaField
	const { name = '' } = field
	return (
		<ACLTextArea
			{...extraProps.input}
			{...field.props}
			key={`${field.name}_${index}`}
			name={name}
			value={value}
			error={error}
			onChange={e => handleChange(name ?? '', e.target.value)}
		/>
	)
}

export default TextArea
