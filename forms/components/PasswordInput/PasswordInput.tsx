import { FC } from 'react'
import { PasswordInput as ACLPasswordInput } from '@admixltd/admix-component-library'
import { IField } from '@forms/generate/types/IField'
import { IPasswordInputField } from '@forms/components/PasswordInput/IPasswordInputField'

const PasswordInput: FC<IField> = ({ field, index, handleChange, value, error }) => {
	field = field as IPasswordInputField
	return (
		<ACLPasswordInput
			{...field.props}
			key={`${field.name}_${index}`}
			name={field.name}
			value={value || ''}
			error={error}
			onChange={e => handleChange(field.name ?? '', e.target.value)}
		/>
	)
}

export default PasswordInput
