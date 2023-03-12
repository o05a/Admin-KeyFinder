/**
 * Function returns an array of keys given enum.
 *
 * Usage: enumKeys(Enum).map(key => Enum[key])
 *
 * @param enumType {enum}
 */
const enumKeys = <O extends object, K extends keyof O = keyof O>(enumType: O): K[] =>
	Object.keys(enumType).filter(k => Number.isNaN(+k)) as K[]

export default enumKeys
