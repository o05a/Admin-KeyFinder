import { ITextField } from '@forms/components/ITextField'
import { NumericInputProps } from '@admixltd/admix-component-library/components/Input/NumericInput'

export interface INumericInputField extends Omit<ITextField, 'props'> {
	type: 'NumericInput'
	props?: NumericInputProps & {
		max?: number
		formatter?: (value: NumericInputProps['value']) => NumericInputProps['value']
	}
}
