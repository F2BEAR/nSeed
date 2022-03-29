module.exports = {
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: [
		'**/*.{js}',
		'**/src/**',
		'!**/src/types.js',
		'!**/examples/**',
		'!**/bin/**',
		'!**/node_modules/**',
		'!**/tests/**'
	],
	coverageDirectory: 'coverage',
	coverageProvider: 'babel',
	moduleFileExtensions: ['js'],
	testEnvironment: 'node',
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
	verbose: true
}
