import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
	preset: "ts-jest",
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: [
		'**/*.{ts}',
		'**/src/**',
		'!**/src/index.ts',
		'!**/examples/**',
		'!**/lib/**',
		'!**/node_modules/**',
		'!**/__test__/**'
	],
	coverageDirectory: 'coverage',
	coverageProvider: 'babel',
	moduleFileExtensions: ['ts', 'js'],
	testEnvironment: 'node',
	verbose: true
}

export default config
