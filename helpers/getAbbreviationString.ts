/**
 * Generate abbreviation string from given string
 *
 * @param str
 */
const getAbbreviationString = (str: string): string =>
	str
		.match(/\b([a-zA-Z])/g)
		?.join('')
		.slice(0, 2)
		.toUpperCase() || 'JD'

export default getAbbreviationString
