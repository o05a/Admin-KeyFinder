import { atom, selector } from 'recoil'
import { SomeObject } from '@admixltd/admix-component-library'
import { Validators } from '@forms/utils/checks/types'

export type ValidatorsStorageType = SomeObject<Validators[]>
const FormFieldValidatorsAtom = atom<ValidatorsStorageType>({
	key: 'FormFieldValidatorsStorage',
	default: {},
})

const FormFieldValidatorsStorage = selector<ValidatorsStorageType>({
	key: 'FormFieldValidatorsStorageSelector',
	get: ({ get }) => get(FormFieldValidatorsAtom),
	set: ({ set, get }, newValue) => {
		set(FormFieldValidatorsAtom, {
			...get(FormFieldValidatorsAtom),
			...newValue,
		})
	},
})
export default FormFieldValidatorsStorage
