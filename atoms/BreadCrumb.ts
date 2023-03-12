import { atom } from 'recoil'
import { BreadCrumb } from '@admixltd/admix-component-library'

const BreadCrumbAtom = atom<BreadCrumb>({
	key: 'BreadCrumb',
	default: undefined,
})

export default BreadCrumbAtom
