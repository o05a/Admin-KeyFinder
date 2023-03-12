import FormFieldValidatorsStorage, { ValidatorsStorageType } from '@forms/atoms/ValidatorsStorage'
import { FormFieldDataUpdater } from '@forms/atoms/Data'
import { FormFieldErrorsDataUpdater } from '@forms/atoms/Errors'
import { SomeObject } from '@admixltd/admix-component-library'
import formValidation from '@forms/utils/formValidation'
import { IFieldValue } from '@forms/generate/types/IFieldValue'
import { IFieldError } from '@forms/generate/types/IFieldError'
import { getRecoil, setRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import { RecoilState } from 'recoil'
import getLabels from '@helpers/getLabels'

const formFieldsValidation = async ({
	fieldsList,
	dataPrefix,
	Validators,
	loadingAtom,
}: {
	fieldsList?: string[]
	dataPrefix?: string
	Validators?: ValidatorsStorageType
	loadingAtom?: RecoilState<boolean>
}) => {
	if (loadingAtom) setRecoil(loadingAtom, true)
	if (fieldsList && dataPrefix) fieldsList = fieldsList.map(f => `${dataPrefix}${f}`)
	if (!fieldsList && dataPrefix)
		fieldsList = Object.keys(getRecoil(FormFieldDataUpdater)).filter(key =>
			key.startsWith(dataPrefix)
		)
	const errors = await formValidation<
		SomeObject<IFieldValue>,
		SomeObject<IFieldError>,
		ValidatorsStorageType
	>({
		DataAtom: FormFieldDataUpdater,
		ErrorsAtom: FormFieldErrorsDataUpdater,
		ValidatorsAtom: FormFieldValidatorsStorage,
		Validators,
		Fields: fieldsList,
		Messages: getLabels().errors.validators,
	})
	if (loadingAtom) setRecoil(loadingAtom, false)
	return Object.values(errors).length === 0
}

export default formFieldsValidation
