import styled from '@emotion/styled'
import UserSubmit from './UserSubmit'

const BasicFieldsFormActions = () => (
	<Container>
		<UserSubmit />
	</Container>
)

const Container = styled.div`
	display: flex;
	gap: 16px;
	justify-content: flex-end;
`

export default BasicFieldsFormActions
