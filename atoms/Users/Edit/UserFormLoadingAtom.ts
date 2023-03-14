import { atom } from 'recoil'

const UserFormLoadingAtom = atom({
	key: `UserFormLoading`,
	default: false,
})

export default UserFormLoadingAtom
