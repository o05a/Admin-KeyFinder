import { FC, PropsWithChildren, ReactElement } from 'react'
import styled from '@emotion/styled'

const WithHeaderActions: FC<
	PropsWithChildren<{
		leftSide: ReactElement
		middle?: ReactElement
		rightSide?: ReactElement
	}>
> = ({ children, leftSide, rightSide, middle }) => (
	<>
		<Header>
			{leftSide}
			{middle && <div>{middle}</div>}
			{rightSide && <div>{rightSide}</div>}
		</Header>
		{children}
	</>
)

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	color: ${({ theme }) => theme.colors.text};
	align-items: center;
	padding-top: 24px;
`

export default WithHeaderActions
