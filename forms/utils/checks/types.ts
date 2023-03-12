import { SomeObject } from '@admixltd/admix-component-library'

export type ChecksType = {
	[key in Validators]: (
		value: unknown,
		options?: OptionsType
	) => undefined | void | string | boolean | Promise<undefined | void | string | boolean>
}

export type Validators =
	| 'required'
	| 'digitsOnly'
	| 'arrayMin'
	| 'maxValue'
	| 'email'
	| 'includeDigits'
	| 'includeSpecialCharacters'
	| 'minLength'
	| 'maxLength'
	| 'minValue'
	| 'positiveDigitsOnly'
	| 'someLongCheck'
	| 'dateValid'
	| 'dateShouldBeAfter'
	| 'dateShouldBeBefore'
	| 'dimensionSupport'

export type OptionsType<T = SomeObject> = Partial<{
	value: number | string | string[]
	allowEmpty: boolean
	formData: T
	message: ((value?: string | number | string[]) => string | void) | string
}>

export type ValidatorsDefinition<T = SomeObject> =
	| Validators
	| {
			name: Validators
			options: OptionsType<T>
	  }
