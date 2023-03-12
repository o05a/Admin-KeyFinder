import { IRegularInputField } from '@forms/components/RegularInput/IRegularInputField'
// eslint-disable-next-line import/no-cycle
import { IBlock } from '@forms/components/Block/IBlock'
import { IPasswordInputField } from '@forms/components/PasswordInput/IPasswordInputField'
import { ICheckBox } from '@forms/components/CheckBox/ICheckBox'
import { ISwitch } from '@forms/components/Switch/ISwitch'
import { INumericInputField } from '@forms/components/NumericInput/INumericInputField'
import { IPercentageInputField } from '@forms/components/PercentageInput/IPercentageInputField'
import { IAutocompleteMultipleClientSideField } from '@forms/components/Autocomplete/Multiple/ClientSide/IAutocompleteMultipleClientSideField'
import { IDropZone } from '@forms/components/DropZone/IDropZone'
import { ITextAreaField } from '@forms/components/TextArea/ITextAreaField'
import { IAutocompleteMultipleAsyncField } from '@forms/components/Autocomplete/Multiple/Async/IAutocompleteMultipleAsyncField'
import { IAutocompleteSingleAsyncField } from '@forms/components/Autocomplete/Single/Async/IAutocompleteSingleAsyncField'

export type IFieldVariant =
	| IRegularInputField
	| IBlock
	| IPasswordInputField
	| ICheckBox
	| ISwitch
	| INumericInputField
	| IPercentageInputField
	| IAutocompleteMultipleClientSideField
	| IDropZone
	| ITextAreaField
	| IAutocompleteMultipleAsyncField
	| IAutocompleteSingleAsyncField
