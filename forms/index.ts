import {
	FormFieldDataAtomUpdater,
	FormFieldDataMerger,
	FormFieldDataUpdater,
} from '@forms/atoms/Data'
import { FormFieldErrorsAtomUpdater, FormFieldErrorsDataUpdater } from '@forms/atoms/Errors'
import getFieldNames from '@forms/utils/getFieldNames'
import formValidation from '@forms/utils/formValidation'
import getDataByFieldsList from '@forms/utils/getDataByFieldsList'
import checks from '@forms/utils/checks'
import { ChecksType, Validators, ValidatorsDefinition } from '@forms/utils/checks/types'
import Fields from './generate/GenerateFields'

export {
	/**
	 * Generator
	 */
	Fields,
	/**
	 * Atoms
	 */
	FormFieldDataAtomUpdater,
	FormFieldDataUpdater,
	FormFieldDataMerger,
	FormFieldErrorsAtomUpdater,
	FormFieldErrorsDataUpdater,
	/**
	 * Helpers
	 */
	getFieldNames,
	formValidation,
	getDataByFieldsList,
	checks,
}

export type { ChecksType, Validators, ValidatorsDefinition }
