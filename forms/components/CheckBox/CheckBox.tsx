import { FC } from 'react'
import { CheckBox as ACLCheckBox } from '@admixltd/admix-component-library'
import { IField } from '@forms/generate/types/IField'
import { ICheckBox } from '@forms/components/CheckBox/ICheckBox'
import styled from '@emotion/styled'
import classnames from 'classnames'
import { ITheme } from '@styles/theme'
import ErrorText from '@forms/components/ErrorText'

const CheckBox: FC<IField> = ({ field, index, handleChange, value: checked, error }) => {
	field = field as ICheckBox
	const { label, labelStyles, ...other } = field.props ?? {}
	const { name = '' } = field
	return (
		<CheckBoxContainer className={classnames({ hasError: !!error })}>
			<CheckBoxContent>
				<ACLCheckBox
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
			</CheckBoxContent>
			{error && <ErrorText>{error}</ErrorText>}
		</CheckBoxContainer>
	)
}

const LabelContainer = styled.div<{
	$color?: keyof ITheme['colors']
}>`
	color: ${({ theme, $color = 'text' }) => theme.colors[$color]};
`
const CheckBoxContent = styled.div`
	align-items: center;
	display: flex;
	gap: 10px;
`

const CheckBoxContainer = styled.div`
	display: grid;
`

export default CheckBox
