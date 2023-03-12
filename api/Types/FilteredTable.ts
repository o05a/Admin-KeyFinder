import { SomeObject } from '@admixltd/admix-component-library'

export enum BodyOperator {
	AND = 'and',
	OR = 'or',
}

export enum FieldOperator {
	greterThan = 'gt',
	lessThan = 'lt',
	equal = 'eq',
	like = 'like',
	in = 'in',
	all = 'all',
}

export interface Body<T = SomeObject> {
	pageIndex?: number
	pageSize?: number
	operator?: BodyOperator
	filters?: Filter<T>[]
	sorts?: Sort<T>[]
}

export interface Filter<T = SomeObject> {
	name?: keyof T
	type?: string
	value?: T[keyof T] | T[keyof T][]
	filters?: Filter<T>[]
	operator?: FieldOperator | BodyOperator
}

export interface FilteredResult<T = SomeObject> {
	items: T[]
	totalCount: number
}

export interface Sort<T = SomeObject> {
	field: keyof T
	desc: boolean
}

export type SearchableColumns<T = SomeObject> = Array<keyof T | Partial<Filter<T>>>
