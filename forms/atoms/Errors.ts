/**
 * Errors storage
 */
import { SomeObject } from '@admixltd/admix-component-library'
import { FormAtomGenerator } from '@admixltd/admix-component-library/FormAtomGenerator'
import { IFieldError } from '@forms/generate/types/IFieldError'

const { AtomUpdater: FormFieldErrorsAtomUpdater, DataMerger: FormFieldErrorsDataUpdater } =
	FormAtomGenerator<SomeObject<IFieldError>>(`FormField__errors`, {})

export { FormFieldErrorsAtomUpdater, FormFieldErrorsDataUpdater }
