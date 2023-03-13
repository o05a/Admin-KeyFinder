import enLabels from './en/index'
import arLabels from './ar/index'

/**
 * Can be added more than one locale
 */
const labels = {
	en: enLabels,
	ar: arLabels,
}

export type ILabels = typeof labels
export default labels
