import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { debounce } from '@mui/material'
import { getRecoil, setRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import { useFirstRender } from '@admixltd/admix-component-library'
import getLabels from '@helpers/getLabels'
import UserService from '@api/Models/users'
import {
	LoadingAtom,
	PageIndexAtom,
	PageSizeAtom,
	SearchAtom,
	TableDataAtom,
} from '@atoms/Users/Table'

const handleTableUpdateFunction = async () => {
	setRecoil(LoadingAtom, true)
	const search = getRecoil(SearchAtom).trim()
	const pageIndex = getRecoil(PageIndexAtom)
	const pageSize = getRecoil(PageSizeAtom)
	const request = await UserService.get()

	;(() => {
		if ('error' in request) {
			Snackbar.error(request.error ?? getLabels().pages.users.errors.noListLoaded)
			return
		}

		const { totalCount, items } = request
		setRecoil(TableDataAtom, { items, totalCount })
	})()

	setRecoil(LoadingAtom, false)
}

export const handleTableUpdate = debounce(handleTableUpdateFunction, 500)

const TableController = () => {
	const firstRender = useFirstRender()
	const pageSize = useRecoilValue(PageSizeAtom)
	const [pageIndex, setPageIndex] = useRecoilState(PageIndexAtom)

	const search = useRecoilValue(SearchAtom)

	useEffect(() => {
		if (firstRender) return
		setPageIndex(0)
	}, [search])

	useEffect(() => {
		if (firstRender) return
		handleTableUpdate()
	}, [pageSize, pageIndex, search])

	return null
}

export default TableController
