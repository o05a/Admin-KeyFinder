import { IFieldWrapper } from '@forms/generate/types/IFieldWrapper'
import { ComponentType, memo, useEffect } from 'react'
import { IField } from '@forms/generate/types/IField'
import FieldsStorage from '@forms/generate/FieldsStorage'
import { IFieldValue } from '@forms/generate/types/IFieldValue'
import FormFieldValidatorsStorage, { ValidatorsStorageType } from '@forms/atoms/ValidatorsStorage'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { FormFieldDataAtomUpdater } from '@forms/atoms/Data'
import { FormFieldErrorsAtomUpdater } from '@forms/atoms/Errors'
import { resetRecoil } from '@admixltd/admix-component-library/RecoilNexus'

const Field = ({
	type,
	name,
	index,
	field,
	parentError,
	onChange: outerHandleChange,
	globalOnChange,
	validators,
	customErrorListener,
	dataPrefix,
	extraProps,
	...props
}: IFieldWrapper) => {
	name = `${dataPrefix}${name}`

	const Component: ComponentType<IField> = FieldsStorage[type] || null
	if (!Component) throw new Error(`There is no component:${type} defined`)

	const setValidators = useSetRecoilState(FormFieldValidatorsStorage)
	const [formDataValue, setFormDataValue] = useRecoilState(FormFieldDataAtomUpdater(name))
	const error = useRecoilValue(FormFieldErrorsAtomUpdater(name))

	/**
	 * Listen for custom error
	 */
	const [customError, setCustomError] = useRecoilState(
		FormFieldErrorsAtomUpdater(customErrorListener)
	)

	const handleChange = (fieldItemName: string, newValue: IFieldValue) => {
		setFormDataValue(newValue)

		/**
		 * Height level change handlers
		 */
		if (outerHandleChange) outerHandleChange(name, newValue)
		if (globalOnChange) globalOnChange(name, newValue)

		if (error) resetRecoil(FormFieldErrorsAtomUpdater(name))
		if (customError) {
			setCustomError(undefined)
			resetRecoil(FormFieldErrorsAtomUpdater(customErrorListener))
		}
	}

	useEffect(() => {
		if (!(validators && validators.length)) return
		setValidators({
			[name]: validators,
		} as ValidatorsStorageType)
	}, [])

	const value = formDataValue

	let fieldError = error
	if (parentError) fieldError = parentError
	if (customError) fieldError = customError

	const componentProps = {
		...props,
		name,
		field,
		index,
		value,
		handleChange,
		error: fieldError,
		dataPrefix,
		extraProps,
	}

	return (
		<div style={{ display: 'grid' }}>
			<Component {...componentProps} />
		</div>
	)
}

export default memo(Field)
