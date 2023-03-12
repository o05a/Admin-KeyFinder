import { FC } from 'react'
import { flexGap, Switch as ACLSwitch } from '@admixltd/admix-component-library'
import { IField } from '@forms/generate/types/IField'
import styled from '@emotion/styled'
import classnames from 'classnames'
import { ITheme } from '@styles/theme'
import ErrorText from '@forms/components/ErrorText'
import { ISwitch } from '@forms/components/Switch/ISwitch'

const Switch: FC<IField> = ({ field, index, handleChange, value: checked, error }) => {
	field = field as ISwitch
	const { label, labelStyles, ...other } = field.props ?? {}
	const { name = '' } = field
	return (
		<SwitchContainer className={classnames({ hasError: !!error })}>
			<SwitchContent>
				<ACLSwitch
					{...other}
					color={error ? 'error' : undefined}
					key={`${name}_${index}`}
					name={name}
					checked={!!checked}
					value={name}
					onChange={() => {
						handleChange(name, !checked)
					}}
				/>
				<LabelContainer $color={error ? 'error' : undefined} style={labelStyles}>
					{label}
				</LabelContainer>
			</SwitchContent>
			{error && <ErrorText>{error}</ErrorText>}
		</SwitchContainer>
	)
}

const LabelContainer = styled.div<{
	$color?: keyof ITheme['colors']
}>`
	color: ${({ theme, $color = 'text' }) => theme.colors[$color]};
	display: inline-flex;
`
const SwitchContent = styled.div`
	align-items: center;
	display: flex;
	align-content: center;
	${({ theme }) => flexGap(theme.switch.labelGap)}
`

const SwitchContainer = styled.div`
	display: grid;
`

export default Switch
