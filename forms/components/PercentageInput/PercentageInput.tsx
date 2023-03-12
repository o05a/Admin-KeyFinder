import { FC } from 'react'
import { IField } from '@forms/generate/types/IField'
import { INumericInputField } from '@forms/components/NumericInput/INumericInputField'
import NumericInput from '@forms/components/NumericInput/NumericInput'
import styled from '@emotion/styled'

const PercentageInput: FC<IField> = ({ field, ...props }) => {
	field = field as INumericInputField

	field.props = {
		max: 100,
		iconEnd: true,
		allowLeadingZeros: false,
		icon: <Percent />,
		...field.props,
	}
	return <NumericInput field={field} {...props} />
}
const Percent = styled.div`
	user-select: none;

	&:before {
		user-select: none;
		content: '%';
	}

	color: ${({ theme }) => theme.colors.gray500};
	font-size: 14px;
	line-height: 150%;
	padding: 0 6px;
`

export default PercentageInput
