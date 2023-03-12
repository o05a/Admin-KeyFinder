import { SomeObject } from '@admixltd/admix-component-library'

const objectToCamelCaseKeys = <O extends object>(obj: O, concatenatedText?: string): SomeObject => {
	const res: SomeObject = {}
	Object.keys(obj).forEach(item => {
		const newKey = `${concatenatedText ?? ''}${item.charAt(0).toUpperCase()}${item
			.slice(1)
			.replaceAll(/(_)./g, c => c.substring(1).toUpperCase())}`
		const data = obj[item as keyof typeof obj]
		res[newKey] = data
	})
	return res
}

export default objectToCamelCaseKeys
