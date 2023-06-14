module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
		'plugin:svelte/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier', 'import'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
	settings: {
		'import/resolver': {
			typescript: true,
		},
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		/// Prettier
		'prettier/prettier': 'warn',

		/// Import
		'import/first': 'error',
		'import/newline-after-import': 'warn',
		'import/order': [
			'error',
			{
				alphabetize: {
					caseInsensitive: true,
					order: 'asc',
				},
				groups: ['unknown', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
				pathGroups: [
					{
						pattern: '$**/**',
						group: 'internal',
						position: 'before',
					},
				],
				'newlines-between': 'always',
			},
		],
	},

	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
	],
};
