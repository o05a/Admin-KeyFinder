import { RecoilState } from 'recoil'
import { SomeObject } from '@admixltd/admix-component-library'
import { getRecoil, setRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import { Validators, ValidatorsDefinition } from '@forms/utils/checks/types'
import checks from '@forms/utils/checks'
import { IFieldError } from '@forms/generate/types/IFieldError'

/**
 * Validate recoil data
 */
export default async function formValidation<
	FormDataProps,
	ErrorAtomValue = SomeObject<IFieldError>,
	ValidatorsStorage = {
		[key in keyof FormDataProps]?: Validators[]
	}
>({
	DataAtom,
	ErrorsAtom,
	ValidatorsAtom,
	Fields,
	Messages,
	Validators: CustomValidators,
}: {
	DataAtom: RecoilState<Partial<FormDataProps>>
	ErrorsAtom: RecoilState<ErrorAtomValue>
	ValidatorsAtom?: RecoilState<ValidatorsStorage>
	Fields?: (keyof FormDataProps)[]
	Validators?: ValidatorsStorage
	Messages?: {
		[key in Validators]: string | ((value?: string | number) => string)
	}
}) {
	const validators = CustomValidators ?? (ValidatorsAtom ? getRecoil(ValidatorsAtom) : null)
	if (validators) {
		const list = Fields && Fields.length ? Fields : Object.keys(validators)
		await Promise.all(
			[...list].map(async key => {
				const name = key as keyof FormDataProps
				const validatorName = key as keyof ValidatorsStorage

				const errorsContainer = {} as ErrorAtomValue
				const formData = getRecoil(DataAtom)
				const value = formData[name]

				const validatorsArray = validators[validatorName]
				if (!validatorsArray) return
				if (!Array.isArray(validatorsArray)) return

				const wrappedValidatorsArray = [...validatorsArray].reverse()
				const errorsArray = await Promise.all(
					wrappedValidatorsArray.map((validator: ValidatorsDefinition<FormDataProps>) =>
						checkResult(validator, value, formData, Messages)
					)
				)
				errorsArray.forEach(error => {
					if (!error) return
					errorsContainer[name as unknown as keyof ErrorAtomValue] =
						error as unknown as ErrorAtomValue[keyof ErrorAtomValue]
				})

				if (Object.keys(errorsContainer as SomeObject<IFieldError>).length !== 0) {
					setRecoil(ErrorsAtom, errorsContainer)
				}
			})
		)
	}
	/**
	 * Wait for last update before return
	 */
	await new Promise(r => {
		setTimeout(r, 1)
	})
	return getRecoil(ErrorsAtom)
}

export const checkResult = <T = unknown>(
	validator: ValidatorsDefinition<T>,
	value?: T[keyof T],
	formData = {} as Partial<T>,
	Messages?: {
		[key in Validators]: string | ((value?: string | number) => string)
	}
) => {
	let options: SomeObject = {}
	let validatorKey: Validators

	if (typeof validator !== 'string') {
		validatorKey = validator.name
		options = {
			...validator.options,
		}
	} else {
		if (!validator) return
		validatorKey = validator
	}

	if (!checks[validatorKey]) return
	if (!options.message && Messages && Messages[validatorKey]) {
		options.message = Messages[validatorKey]
	}
	return checks[validatorKey](value, {
		...options,
		formData,
	})
}
