import styled from '@emotion/styled'
import { RecoilState, useRecoilState } from 'recoil'
import { ReactComponent as SearchIcon } from '@svg/InventoryManagement/search.svg'
import { ReactElement, useEffect, useRef } from 'react'
import { setCookie } from 'cookies-next'
import { resetRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import { Button, Input, Menu, Tooltip } from '@admixltd/admix-component-library'

const SearchComponentCreator = ({
	SearchAtom,
	cookieName,
	labels = {},
	popupId,
	cookieMaxAge = 60 * 60, // 1 hour
}: {
	SearchAtom: RecoilState<string>
	cookieName?: string
	labels?: { placeholder?: string; tooltip?: ReactElement | string }
	popupId?: string
	cookieMaxAge?: number
}) => {
	const [search, setSearch] = useRecoilState(SearchAtom)
	const { placeholder, tooltip } = labels

	useEffect(() => {
		if (!cookieName) return
		setCookie(cookieName, search, {
			maxAge: cookieMaxAge,
		})
	}, [search])

	const ref = useRef<HTMLInputElement>()
	return (
		<Menu
			{...{ popupId }}
			anchor={({ popupState, bindTrigger }) => {
				const { isOpen } = popupState
				const { onClick, ...anchorProps } = bindTrigger(popupState)

				const anchorComponent = (
					<StyledButton
						{...anchorProps}
						onClick={e => {
							if (onClick) onClick(e)
							setTimeout(() => {
								ref.current?.focus()
							}, 100)
						}}
						active={isOpen}
						icon={<SearchIcon />}
						color={search ? 'primary' : 'gray500'}
					/>
				)

				if (!tooltip) {
					return anchorComponent
				}
				return (
					<Tooltip title={tooltip} placement="top">
						{anchorComponent}
					</Tooltip>
				)
			}}
		>
			{() => (
				<DropDownContainer>
					<Input
						{...{
							inputRef: ref,
							placeholder,
						}}
						value={search}
						onClear={() => {
							resetRecoil(SearchAtom)
						}}
						onChange={e => {
							setSearch(e.target.value)
						}}
					/>
				</DropDownContainer>
			)}
		</Menu>
	)
}

const StyledButton = styled(Button)`
	&&& {
		padding: 8px;

		svg,
		img {
			height: 24px;
			width: 24px;
		}
	}
`

const DropDownContainer = styled.div`
	user-select: none;
	padding: 8px;
	min-width: 335px;
`

export default SearchComponentCreator
