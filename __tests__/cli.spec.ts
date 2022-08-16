import mockArgv from 'mock-argv'
import { mockCwd } from 'mock-cwd'
import { cli } from '../src/cli'
import { join } from 'path'

describe('Test the CLI function', () => {
    beforeEach(() => jest.restoreAllMocks())
    console.log = jest.fn()
    console.error = jest.fn()

	test('The --help flag should work', () => {
        mockArgv(['-h'], async () => {
            await cli()
            expect(console.log).toHaveBeenCalled()
        })
	})

    test('The --version flag should work', () => {
        mockArgv(['-v'], async () => {
            await cli()
            expect(console.log).toHaveBeenCalledWith("1.0.0")
        })
	})

    test('It should return an error if an unknown option is given', () => {
        mockArgv(['mongodb://localhost:27017/', '--bad'], async () => {
            await cli().then(() => {
                expect(console.error).toHaveBeenCalledWith("Error: unknown or unexpected option: --bad")
            })
        })
    })

    test('It should return an error if an invalid connection string is given', () => {
        mockArgv(['not-a-connection-string', '-t', './examples/templates/temp.js', '-d', 'test', '-c', 'test', '-a', '100'], async () => {
            await cli().then(() => {
                expect(console.error).toHaveBeenCalledWith('\nError: you must provide a valid MongoDB connection string.')
            })
        })
    })

    test('It should return an error if an invalid path is given', () => {
        mockArgv(['mongodb://localhost:27017/', '-t', './bad-path.sh', '-d', 'test', '-c', 'test', '-a', '10'], async () => {
            await cli().then(() => {
                expect(console.error).toHaveBeenCalledWith('\nError: The provided path for the config does not comply with the relative path format (i.e: ./*/*.js)')
            })
        })
    })
    
    test('It should use the config file if it is present on the current folder', () => {
        mockCwd(join(process.cwd(),'/examples'), async () => {
            await cli().then(() => {
                expect(console.log).toHaveBeenCalledWith('\nnSeed Closed.')
            })
        })
    })

})

