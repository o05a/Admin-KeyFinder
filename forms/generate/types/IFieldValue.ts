import { Dayjs } from 'dayjs'
import { SomeObject } from '@admixltd/admix-component-library'

export type IFieldValue =
	| string
	| number
	| boolean
	| undefined
	| string[]
	| Dayjs
	| SomeObject
	| SomeObject[]
	| {
			[key: string]: IFieldValue
	  }
