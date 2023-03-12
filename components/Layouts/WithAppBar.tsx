import { FC, PropsWithChildren } from 'react'
import AppBar from '@components/Main/AppBar/AppBar'
import styled from '@emotion/styled'

const WithAppBar: FC<PropsWithChildren<unknown>> = ({ children }) => (
	<>
		<PlaceHolder />
		<AppBarContainer>
			<AppBar />
		</AppBarContainer>
		{children}
	</>
)

const PlaceHolder = styled.div`
	height: ${({ theme }) => theme.appbar.height}px;
`

const AppBarContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 10;
`

export default WithAppBar
