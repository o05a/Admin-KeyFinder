import { FC, PropsWithChildren, ReactElement } from 'react'
import styled from '@emotion/styled'

const WithHeader: FC<
	PropsWithChildren<{
		title: string
		middle?: ReactElement
		rightSide?: ReactElement
	}>
> = ({ children, title, rightSide, middle }) => (
	<>
		<Header>
			<Title>{title}</Title>
			{middle && <div>{middle}</div>}
			{rightSide && <div>{rightSide}</div>}
		</Header>
		{children}
	</>
)

const Title = styled.h2`
	font-style: normal;
	font-weight: 600;
	font-size: 18px;
	line-height: 100%;
	display: flex;
`
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	color: ${({ theme }) => theme.colors.text};
	align-items: center;
	min-height: 50px;
`

export default WithHeader
