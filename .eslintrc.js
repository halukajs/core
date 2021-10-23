module.exports = {
	'env': {
		'es6': true,
		'node': true
	},
	'parser': '@typescript-eslint/parser',
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'plugins': [
		'@typescript-eslint',
	],
	'parserOptions': {
		'ecmaVersion': 2018
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }]
	},
	'ignorePatterns': [
		'test/*',
		'build/*'
	]
}
