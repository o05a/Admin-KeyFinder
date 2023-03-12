import { InputProps, SomeObject } from '@admixltd/admix-component-library'
import { ITextField } from '@forms/components/ITextField'
import { AutoCompleteProps } from '@admixltd/admix-component-library/AutoComplete'

export interface IAutocompleteMultipleClientSideField<T = SomeObject>
	extends Omit<ITextField, 'props'> {
	type: 'AutocompleteMultipleClientSide'
	inputProps?: InputProps
	props: Omit<AutoCompleteProps<T, true>, 'value'> & {
		creatable?: boolean
	}
}
