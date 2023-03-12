import { Dayjs } from 'dayjs'
import { SomeObject } from '@admixltd/admix-component-library'
import { IDropZoneValue } from '@forms/components/DropZone/IDropZone'

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
	| IDropZoneValue[]
