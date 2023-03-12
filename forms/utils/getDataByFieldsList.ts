import { getRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import { SomeObject } from '@admixltd/admix-component-library'
import { IFieldValue } from '@forms/generate/types/IFieldValue'
import { FormFieldDataUpdater } from '@forms/atoms/Data'

const getDataByFieldsList = ({
	fieldsList,
	dataPrefix,
}: {
	fieldsList?: string[]
	dataPrefix?: string
}) => {
	const formFieldData = getRecoil(FormFieldDataUpdater)
	const result: SomeObject<IFieldValue> = {}

	if (!fieldsList && dataPrefix)
		fieldsList = Object.keys(formFieldData).filter(key => key.startsWith(dataPrefix))

	fieldsList?.forEach(name => {
		let key = name
		if (dataPrefix) key = key.replace(dataPrefix, '')

		result[key] = formFieldData[name]
	})

	return result
}

export default getDataByFieldsList
