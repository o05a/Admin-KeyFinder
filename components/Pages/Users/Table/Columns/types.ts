import { ColumnDefinition } from '@admixltd/admix-component-library/Table'
import { User } from '@api/Models/users/types'

export interface UserColumnDefinition extends Omit<ColumnDefinition, 'field'> {
	field: keyof User
}
