import { getSession, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import { getRouter } from 'helpers/RouterNexus'
import pages from '@constants/pages'
import { Session } from 'next-auth'
import getLabels from '@helpers/getLabels'

interface Nexus {
	get?: Session | null
}

const nexus: Nexus = {}

export default function SessionController() {
	const { data: session } = useSession()
	nexus.get = useSession().data
	useEffect(() => {
		if (session?.expired) {
			signOut({
				redirect: false,
			})
			Snackbar.error(getLabels().errors.sessionChecker.SessionExpired)
			getRouter()?.push(pages.login.url)
		}
	}, [session?.expired, session?.expires])

	return null
}

export const getClientSession = async () => {
	if (typeof window === 'undefined') return null
	if (!nexus.get) nexus.get = await getSession()
	return nexus.get
}
