import { INumericInputField } from '@forms/components/NumericInput/INumericInputField'

export interface IPercentageInputField extends Omit<INumericInputField, 'type'> {
	type: 'PercentageInput'
}
