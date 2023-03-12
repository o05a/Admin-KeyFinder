import { AdmixLibraryTheme } from '@admixltd/admix-component-library'
import '@emotion/react'

/**
 * Project level styles
 */
const projectTheme = {
	mobile: `@media (max-width: ${AdmixLibraryTheme.adaptive.breakpointValues.lg - 1}px)`,
	desktop: `@media (min-width: ${AdmixLibraryTheme.adaptive.breakpointValues.lg}px)`,
	drawer: {
		collapsedWidth: 24,
		expandedWidth: 248,
	},
	appbar: {
		height: 56,
	},
	checkBox: {
		labelGap: 10,
	},
	switch: {
		labelGap: 10,
	},
}

/**
 * Only overrides here, like
 * themeBase.colors.white = '#ffffff'
 */

/**
 * Extend style-components with theme type
 */
export type ITheme = typeof AdmixLibraryTheme & typeof projectTheme
const theme = { ...AdmixLibraryTheme, ...projectTheme } as ITheme
export type PropsWithTheme<T = unknown> = T & {
	theme: ITheme
}

declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface Theme extends ITheme {}
}

export default theme
