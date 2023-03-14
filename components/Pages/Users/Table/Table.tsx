import { gridClasses } from '@mui/x-data-grid'

import { useRecoilValue } from 'recoil'
import styled from '@emotion/styled'
import LabelsAtom from '@atoms/Labels'
import { SomeObject } from '@admixltd/admix-component-library'
import { CellEditCommit, Table as ACLTable } from '@admixltd/admix-component-library/Table'
import { ColumnVisibilityAtom, LoadingAtom, PageSizeAtom, TableDataAtom } from '@atoms/Users/Table'
import UserService from '@api/Models/users'
import { setRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import { User } from '@api/Models/users/types'
import { FilteredResult } from '@api/Types/FilteredTable'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import getLabels from '@helpers/getLabels'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import columns from './Columns'

const handleCellEditCommit: CellEditCommit = async ({
	id,
	value,

	updatedRows,
	updatedTotalCount,

	prevRows,
	prevTotalCount,
}) => {
	/**
	 * Should be updated immediately
	 */
	setRecoil(TableDataAtom, {
		items: updatedRows,
		totalCount: updatedTotalCount,
	} as FilteredResult<User>)

	let request
	if (value === false) request = await UserService.deActivate(id)
	if (value === true) request = await UserService.activate(id)

	setRecoil(LoadingAtom, false)

	const { successes, errors } = getLabels().pages.users.edit

	if (!request || request.error) {
		Snackbar.error(
			value === false ? errors.deActivationFailure(id) : errors.activationFailure(id)
		)
		/**
		 * Revert state
		 */
		setRecoil(TableDataAtom, {
			items: prevRows,
			totalCount: prevTotalCount,
		} as FilteredResult<User>)
	}
	if (request && 'success' in request) {
		Snackbar.success(
			value === false ? successes.deActivateSuccess(id) : successes.activateSuccess(id)
		)
	}
}
const onCellEditCommit = AwesomeDebouncePromise(handleCellEditCommit, 500)

const Table = () => {
	const pageSize = useRecoilValue(PageSizeAtom)
	const tableData = useRecoilValue(TableDataAtom) ?? []
	const loading = useRecoilValue(LoadingAtom)
	const columnLabels = useRecoilValue(LabelsAtom).pages.users.columns

	const hiddenColumns = useRecoilValue(ColumnVisibilityAtom)
	const columnVisibilityModel: SomeObject<boolean> = {}
	hiddenColumns.forEach(column => {
		columnVisibilityModel[column] = false
	})

	return (
		<Container>
			<StyledTable
				{...{
					loading,
					rows: tableData?.items ?? [],
					columns: columns(columnLabels),
					pageSize,
					columnVisibilityModel,
					rowCount: tableData.totalCount,
					onCellEditCommit,
				}}
				getRowId={({ id }) => id}
				hideFooter
				autoHeight
			/>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-grow: 1;
`

const StyledTable = styled(ACLTable)`
	&& {
		.${gridClasses.columnHeaders} {
			border-top-right-radius: 4px;
			border-top-left-radius: 4px;
		}
	}
`
export default Table
