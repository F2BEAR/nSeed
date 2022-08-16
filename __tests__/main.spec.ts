import { main } from '../src/main'

describe('Test the main.js functions', () => {
    beforeEach(() => jest.restoreAllMocks())
    jest.setTimeout(50000)
    console.log = jest.fn()
    console.error = jest.fn()

    test('It should return an error when a problem occurs', async () => {
        await main('mongodb://localhost:27017/', 100, 'test', 'test', './bad.js', false)
        expect(console.error).toHaveBeenNthCalledWith(2,'There is nothing to seed.')        
	})

    test('it should throw an error message when an invalid connection string is given', async () => {
        await main('mongodb://badpath:333', 100, 'test', 'test', './examples/templates/test-tmpl.js', false)
        expect(console.error).toHaveBeenCalledWith('Error: getaddrinfo ENOTFOUND badpath')
    })
    
})

