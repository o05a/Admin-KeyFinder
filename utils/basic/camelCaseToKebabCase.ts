import { SomeObject } from '@admixltd/admix-component-library'

const camelCaseToKebabCase = (formData: SomeObject, prefix: string) => {
	const res: SomeObject = {}
	Object.keys(formData).forEach(item => {
		const toKebabize = item.split(prefix)[1]
		if (toKebabize) {
			const kebabCaseKey = toKebabize.replace(
				/[A-Z]+(?![a-z])|[A-Z]/g,
				($, ofs) => (ofs ? '_' : '') + $.toLowerCase()
			)
			res[kebabCaseKey] = formData[item]
		}
	})
	return res
}

export default camelCaseToKebabCase
