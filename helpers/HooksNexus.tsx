/* eslint-disable prefer-destructuring */
import { useModal } from 'mui-modal-provider'
import { useWindowSize } from '@admixltd/admix-component-library'
import { useTheme } from '@emotion/react'

type Nexus = {
	getModal?: ReturnType<typeof useModal>
	getWindowSize?: ReturnType<typeof useWindowSize>
	getTheme?: ReturnType<typeof useTheme>
}

const nexus: Nexus = {}

export default function HooksNexus() {
	nexus.getModal = useModal()
	/* Get actual theme */
	nexus.getTheme = useTheme()
	/* Get actual state of window size */
	nexus.getWindowSize = useWindowSize()

	return null
}

export const getModal = () => nexus.getModal
export const getWindowSize = () => nexus.getWindowSize
