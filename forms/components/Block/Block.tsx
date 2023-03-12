import { FC } from 'react'
import { Box } from '@mui/material'
import GenerateFields from '@forms/generate/GenerateFields'
import { IBlock } from '@forms/components/Block/IBlock'
import { IField } from '@forms/generate/types/IField'

const Block: FC<IField> = ({ field, key, index, dataPrefix, extraProps = {} }) => {
	const { content, props, sections, component } = field as IBlock

	const { children, ...otherProps } = props ?? {}

	const inlineProps = {
		component,
		...otherProps,
		key,
	}

	return (
		<Box {...inlineProps}>
			{children ?? content}
			{sections
				? GenerateFields(sections, { subIndex: index, dataPrefix, extraProps }).fields
				: null}
		</Box>
	)
}

export default Block
