import { IFieldValue } from '@forms/generate/types/IFieldValue'
import { checkResult } from '@forms/utils/formValidation'
import { Validators, ValidatorsDefinition } from '@forms/utils/checks/types'

const fieldValidation = async <ValueType = IFieldValue>({
	value,
	validators,
	messages,
}: {
	value: ValueType
	validators: ValidatorsDefinition | ValidatorsDefinition[]
	messages?: {
		[key in Validators]: string | ((value?: string | number) => string)
	}
}) =>
	Promise.all(
		[...(Array.isArray(validators) ? validators : [validators])].map(validator =>
			checkResult(validator, value, undefined, messages)
		)
	)

export default fieldValidation
