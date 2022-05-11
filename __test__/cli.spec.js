const mockArgv = require('mock-argv')
const { cli } = require('../src/cli')

describe('Test the CLI function', () => {

	test('The --help flag should work', () => {
        console.log = jest.fn()
        mockArgv(['-h'], () => {
            cli(process.argv)
            expect(console.log).toHaveBeenCalled()
        })
	})

    test('The --version flag should work', () => {
        console.log = jest.fn()
        mockArgv(['-v'], () => {
            cli(process.argv)
            expect(console.log).toHaveBeenCalledWith("1.0.0")
        })
	})

    test('It should return an error when an invalid connection string is given', () => {
        console.error = jest.fn()
        mockArgv(['foo://bad.uri'], () => {
            cli(process.argv).then(() => {
                expect(console.error).toHaveBeenNthCalledWith(1, "Error: you must provide a valid MongoDB connection string.")
                expect(console.error).toHaveBeenNthCalledWith(2, "\nnSeed Closed.")
            })
        })
    })

    test('It should throw an error when an invalid template path is given', () => {
        console.error = jest.fn()
        mockArgv(['mongodb://localhost:27017/', '-t', '/bad-path'], () => {
            cli(process.argv).then(() => {
                expect(console.error).toHaveBeenNthCalledWith(1, "Error: The provided path for the template does not comply with the format ./*/*.json")
                expect(console.error).toHaveBeenNthCalledWith(2, "\nnSeed Closed.")
            })
        })
    })

    test('It should throw an error when an invalid amount is given', () => {
        console.error = jest.fn()
        mockArgv(['mongodb://localhost:27017/', '-a', 'n1o0'], () => {
            cli(process.argv).then(() => {
                expect(console.error).toHaveBeenNthCalledWith(1, "Error: The amount must be a number")
                expect(console.error).toHaveBeenNthCalledWith(2, "\nnSeed Closed.")
            })
        })
    })
})

