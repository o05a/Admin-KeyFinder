import { atom } from 'recoil'
import { FieldOperator, FilteredResult, SearchableColumns } from '@api/Types/FilteredTable'
import { User } from '@api/Models/users/types'

const prefix = `UserTable`
export const TableDataAtom = atom<FilteredResult<User>>({
	key: `${prefix}Data`,
	default: {
		items: [],
		totalCount: 0,
	},
})

export const SearchCookieName = `${prefix}Search`
export const ColumnSelectorCookieName = `${prefix}ColumnSelector`
export const searchableColumns: SearchableColumns<User> = [
	{ name: 'id', operator: FieldOperator.equal },
	'name',
	'userName',
]

export const SearchAtom = atom({
	key: `${prefix}Search`,
	default: ``,
})

export const PageSizeAtom = atom({
	key: `${prefix}Size`,
	default: 10,
})

export const PageIndexAtom = atom({
	key: `${prefix}PageIndex`,
	default: 0,
})

export const LoadingAtom = atom({
	key: `${prefix}Loading`,
	default: false,
})

export const ColumnVisibilityDefaultState: Set<keyof User> = new Set()
export const ColumnVisibilityAtom = atom<Set<keyof User>>({
	key: `${prefix}ColumnVisibility`,
	default: ColumnVisibilityDefaultState,
})
