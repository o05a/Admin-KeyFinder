import { ValidatorsDefinition } from '@forms/utils/checks/types'
import { IField, IHandleChange } from '@forms/generate/types/IField'

export interface IBasicField {
	name: IField['name']
	validation?: ValidatorsDefinition[]
	customErrorListener?: string[] | string
	onChange?: IHandleChange
}
