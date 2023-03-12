import { IFieldValue } from '@forms/generate/types/IFieldValue'
import { useRecoilValue } from 'recoil'
import { FormFieldDataAtomUpdater } from '@forms'

export interface UseFieldDataOptions {
	dataPrefix: string
}

export type UseFieldDataProps = (
	field: string,
	options?: Partial<UseFieldDataOptions>
) => IFieldValue

const useFieldData: UseFieldDataProps = (field, { dataPrefix = '' } = {}) =>
	useRecoilValue(FormFieldDataAtomUpdater(`${dataPrefix}${field}`))

export default useFieldData
