/**
 * Data storage
 */
import { SomeObject } from '@admixltd/admix-component-library'
import { FormAtomGenerator } from '@admixltd/admix-component-library/FormAtomGenerator'
import { IFieldValue } from '@forms/generate/types/IFieldValue'

const {
	AtomUpdater: FormFieldDataAtomUpdater,
	DataUpdater: FormFieldDataUpdater,
	DataMerger: FormFieldDataMerger,
} = FormAtomGenerator<SomeObject<IFieldValue>>('FormField', {})

export { FormFieldDataAtomUpdater, FormFieldDataUpdater, FormFieldDataMerger }
