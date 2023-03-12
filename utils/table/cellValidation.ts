import { ValidatorsDefinition } from '@forms'
import fieldValidation from '@forms/utils/fieldValidation'
import getLabels from '@helpers/getLabels'
import { ColumnDefinition } from '@admixltd/admix-component-library/Table'

const cellValidation = (validators: ValidatorsDefinition[]) =>
	({
		preProcessEditCellProps: async params => {
			const {
				props: { value },
			} = params

			const [error] = await fieldValidation({
				value,
				validators,
				messages: getLabels().errors.validators,
			}).then(errors => errors.filter(e => !!e))
			return { ...params.props, error }
		},
	} as Partial<ColumnDefinition>)

export default cellValidation
