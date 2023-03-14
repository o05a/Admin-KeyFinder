import { ILabels } from '@labels'
import { ColumnDefinition } from '@admixltd/admix-component-library/Table'
import { GridValueFormatterParams } from '@mui/x-data-grid'
import getLabels from '@helpers/getLabels'
import columnAutoWidth from '@utils/table/columnAutoWidth'
import dayjs from 'dayjs'
import { UserColumnDefinition } from './types'
import Actions from './Actions'
import Roles from './Roles'

const valueFormatter = ({ value }: GridValueFormatterParams) => {
	if (!value) return getLabels().pages.users.errors.noDataSpecified
	return value
}

const Columns: (
	labels: ILabels[keyof ILabels]['pages']['users']['columns']
) => Array<ColumnDefinition> = labels =>
	(
		[
			{ field: 'id', headerName: labels.id, sortable: false },
			{
				field: 'isActive',
				headerName: labels.status,
				width: 70,
				editable: 'switch',
				sortable: false,
				valueFormatter: ({ value }: GridValueFormatterParams) => {
					if (!value || value === false) return false
					return true
				},
			},
			{ field: 'userName', headerName: labels.userName, sortable: false },
			{ field: 'fullName', headerName: labels.fullName, sortable: false },
			{ field: 'emailAddress', headerName: labels.emailAddress, width: 300, sortable: false },
			{ ...Roles, headerName: labels.roles },
			{
				field: 'lastLoginTime',
				headerName: labels.lastLogin,
				sortable: false,
				valueFormatter: ({ value }) =>
					value ? dayjs(`${value}`).format('DD/MM/YYYY h:mm A') : '-',
			},
			{
				field: 'creationTime',
				headerName: labels.creation,
				sortable: false,
				valueFormatter: ({ value }) =>
					value ? dayjs(`${value}`).format('DD/MM/YYYY h:mm A') : '-',
			},
			Actions(labels),
		] as UserColumnDefinition[]
	).map((column: ColumnDefinition) => ({
		...columnAutoWidth(column),
		valueFormatter: column.valueFormatter ?? valueFormatter,
	}))

export default Columns
