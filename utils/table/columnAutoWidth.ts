import { ColumnDefinition } from '@admixltd/admix-component-library/Table'

const columnAutoWidth = (column: ColumnDefinition, minWidth = 200) => {
	if (column.flex) return column
	if (column.width) return column
	if (column.minWidth) return column
	if (column.maxWidth) return column
	if (column.alwaysHidden) return column
	if (column.type === 'actions') return column
	return {
		...column,
		minWidth,
		flex: 1,
	}
}

export default columnAutoWidth
