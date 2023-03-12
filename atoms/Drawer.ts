import { atom } from 'recoil'
import CookiePrefix from '@constants/cookiePrefix'

export const DrawerCookieName = `${CookiePrefix}DrawerOpenedState`
const DrawerAtom = atom<boolean>({
	key: 'DrawerOpened',
	default: false,
})

export default DrawerAtom
