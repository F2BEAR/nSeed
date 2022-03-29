const mockArgv = require('mock-argv')
const { cli } = require('../src/cli')
const { version } = require('../package.json')

describe('Test the CLI function', () => {

	test('The --help flag should work', () => {
        console.log = jest.fn();
        mockArgv(['-h'], () => {
            cli(process.argv)
            expect(console.log).toHaveBeenCalled()
        })
	})

    test('The --version flag should work', () => {
        console.log = jest.fn();
        mockArgv(['-v'], () => {
            cli(process.argv)
            expect(console.log).toHaveBeenCalledWith(version)
        })
	})
})

