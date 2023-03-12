import { RecoilState, useRecoilState } from 'recoil'
import { ReactComponent as ColumnSelectorIcon } from '@svg/Table/columnSelector.svg'
import styled from '@emotion/styled'
import { Tooltip } from '@admixltd/admix-component-library'
import {
	ColumnDefinition,
	ColumnSelectorToggle,
	ColumnSelectorToggleProps,
} from '@admixltd/admix-component-library/Table'
import { ReactElement, useEffect, useMemo } from 'react'
import { setCookie } from 'cookies-next'
import setsEqual from '@utils/setsEqual'

const ColumnSelectorCreator = ({
	ColumnVisibilityAtom,
	columns,
	cookieName,
	cookieMaxAge = 60 * 60 * 24 * 7, // 1 week
	ColumnVisibilityDefaultState = new Set(),
	labels: { placeholder, tooltip, noOptionsText, hideAllLabel, showAllLabel } = {},
}: {
	columns: ColumnDefinition[]
	cookieName?: string
	cookieMaxAge?: number
	labels?: {
		placeholder?: string
		tooltip?: ReactElement | string
		noOptionsText?: ColumnSelectorToggleProps['noOptionsText']
		hideAllLabel?: ColumnSelectorToggleProps['hideAllLabel']
		showAllLabel?: ColumnSelectorToggleProps['showAllLabel']
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ColumnVisibilityDefaultState?: Set<any>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ColumnVisibilityAtom: RecoilState<Set<any>>
}) => {
	const [hiddenColumns, hiddenColumnsSetter] = useRecoilState(ColumnVisibilityAtom)
	const isActive = useMemo(
		() => !setsEqual(ColumnVisibilityDefaultState, hiddenColumns),
		[ColumnVisibilityDefaultState, hiddenColumns]
	)

	useEffect(() => {
		if (!cookieName) return
		setCookie(cookieName, [...hiddenColumns], {
			maxAge: cookieMaxAge,
		})
	}, [hiddenColumns])

	return (
		<StyledColumnSelectorToggle
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			icon={<ColumnSelectorIcon />}
			color={isActive ? 'primary' : 'gray500'}
			{...{
				placeholder,
				hideAllLabel,
				showAllLabel,
				noOptionsText,
			}}
			anchorWrapper={button => {
				if (!tooltip) return button
				return (
					<Tooltip title={tooltip} placement="top-end">
						{button}
					</Tooltip>
				)
			}}
			{...{
				columns,
				hiddenColumns,
				hiddenColumnsSetter,
			}}
		/>
	)
}

const StyledColumnSelectorToggle = styled(ColumnSelectorToggle)`
	&&& {
		padding: 8px !important;

		svg,
		img {
			height: 24px;
			width: 24px;
		}
	}
`

export default ColumnSelectorCreator
