import { FieldOperator, Filter, SearchableColumns } from '@api/Types/FilteredTable'
import { SomeObject } from '@admixltd/admix-component-library'

const searchFilters = <T = SomeObject>(search: string, searchableColumns: SearchableColumns<T>) =>
	searchableColumns.map(item => {
		let filter: Partial<Filter<T>> = {}
		let name: keyof T | undefined
		if (typeof item === 'string') {
			name = item
		} else if (typeof item === 'object') {
			filter = { ...item }
		}
		return {
			name,
			value: search,
			operator: FieldOperator.like,
			...filter,
		} as Filter<T>
	})

export default searchFilters
