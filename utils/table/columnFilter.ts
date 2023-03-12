import { FieldOperator, Filter } from '@api/Types/FilteredTable'
import { SomeObject } from '@admixltd/admix-component-library'

const columnFilter = <T = SomeObject>(filter: T[keyof T], name: keyof T) =>
	({
		name,
		value: filter,
		operator: FieldOperator.equal,
	} as Filter<T>)

export default columnFilter
