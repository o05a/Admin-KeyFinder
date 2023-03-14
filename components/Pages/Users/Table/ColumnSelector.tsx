import { useRecoilValue } from 'recoil'

import LabelsAtom from '@atoms/Labels'
import ColumnSelectorCreator from '@components/Helpers/Table/ColumnSelectorCreator'
import {
	ColumnSelectorCookieName,
	ColumnVisibilityAtom,
	ColumnVisibilityDefaultState,
} from '@atoms/Users/Table'
import columns from './Columns'

const ColumnSelector = () => {
	const {
		columns: columnLabels,
		fields: { columnSelector },
	} = useRecoilValue(LabelsAtom).pages.users

	return (
		<ColumnSelectorCreator
			{...{
				cookieName: ColumnSelectorCookieName,
				ColumnVisibilityDefaultState,
				ColumnVisibilityAtom,
				labels: columnSelector,
				columns: columns(columnLabels),
			}}
		/>
	)
}

export default ColumnSelector
