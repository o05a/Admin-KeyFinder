import { IFieldVariant } from '@forms/generate/types/IFieldVariant'

/**
 * Get field names from generation
 */
const getFieldNames = (
	sections?: Array<
		IFieldVariant & {
			sections?: IFieldVariant[]
			items?: IFieldVariant[]
		}
	>,
	dataPrefix = ''
) => {
	let names: string[] = []

	sections?.forEach(({ name, sections: subSections, items }) => {
		if (name) {
			names = [...names, `${dataPrefix}${name}`]
		}
		if (subSections && subSections.length !== 0) {
			names = [...names, ...getFieldNames(subSections)]
		}
		if (items && items.length !== 0) {
			names = [...names, ...getFieldNames(items)]
		}
	})
	return [...new Set(names)]
}

export default getFieldNames
