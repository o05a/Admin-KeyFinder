import styled from '@emotion/styled'
import { chipClasses } from '@mui/material'
import { Chip, Tooltip } from '@admixltd/admix-component-library'
import { ColumnDefinition } from '@admixltd/admix-component-library/Table'

export default {
	field: 'roleNames',
	flex: 2,
	minWidth: 330,
	renderCell: ({ value }) => {
		if (!value) return ''
		const firstRoles = [...value].slice(0, 2)
		const lastRoles = [...value].slice(2)
		return (
			<ChipsContainer>
				{firstRoles && firstRoles.map(role => <Chip label={role} key={role} />)}
				{lastRoles.length !== 0 && (
					<Tooltip title={lastRoles.join(', ')}>
						<Chip label={`+${lastRoles.length}`} />
					</Tooltip>
				)}
			</ChipsContainer>
		)
	},
} as ColumnDefinition

const ChipsContainer = styled.div`
	display: grid;
	grid-auto-flow: column;
	gap: 4px;

	.${chipClasses.root} {
		max-width: 140px;
	}
`
