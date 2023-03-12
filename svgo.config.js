module.exports = {
	plugins: [
		{
			name: 'preset-default',
		},
		'convertStyleToAttrs',
		'prefixIds',
		'cleanupListOfValues',
		'removeRasterImages',
		'sortAttrs',
		'reusePaths',
		'removeDimensions'
	],
}
