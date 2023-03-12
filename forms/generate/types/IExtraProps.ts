/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputProps } from '@admixltd/admix-component-library'
import { AutoCompleteProps } from '@admixltd/admix-component-library/AutoComplete'

export interface IExtraProps {
	input?: Partial<Omit<InputProps, 'defaultValue'>>
	autocomplete?: Partial<AutoCompleteProps<any, any>>
}
