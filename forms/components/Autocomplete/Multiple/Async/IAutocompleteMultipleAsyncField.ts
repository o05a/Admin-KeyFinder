import { InputProps, SomeObject } from '@admixltd/admix-component-library'
import { ITextField } from '@forms/components/ITextField'
import { AutoCompleteProps } from '@admixltd/admix-component-library/AutoComplete'

export interface IOnChangeEventsHandlers {
	[key: string]: (currentVal: Array<SomeObject>, newVal: Array<SomeObject>) => Promise<boolean>
}

export interface IAutocompleteMultipleAsyncField<T = SomeObject> extends Omit<ITextField, 'props'> {
	type: 'AutocompleteMultipleAsync'
	inputProps?: InputProps
	props: Omit<AutoCompleteProps<T, true>, 'value'> & {
		onChangeEventsHandlers?: IOnChangeEventsHandlers
	}
}
