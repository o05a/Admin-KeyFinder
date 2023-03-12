import { IBasicField } from '@forms/components/IBasicField'
import { InputProps } from '@admixltd/admix-component-library'

export interface ITextField extends Partial<IBasicField> {
	props?: InputProps
}
