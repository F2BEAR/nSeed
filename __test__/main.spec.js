const  main = require('../src/main')
const { mockCwd } = require('mock-cwd')

describe('Test the main.js functions', () => {
    jest.setTimeout(50000)
    test('It should return an error when a problem occurs', async () => {
        console.error = jest.fn()
        process.exit = jest.fn()
        await main.main('mongodb://localhost:27017/', 100, 'test', 'test', './bad.json', false).then(() => {
            expect(console.error).toHaveBeenNthCalledWith(2,'\nnSeed Closed.')
            expect(process.exit).toHaveBeenCalledTimes(1)
        })
	})
    test('it should throw an error message when an invalid connection string is given', async () => {
        console.error = jest.fn()
        await main.main('mongodb://badpath:333', 100, 'test', 'test', './examples/templates/test-tmpl.json', false).then(() => {
            expect(console.error).toHaveBeenNthCalledWith(1,'Error: getaddrinfo ENOTFOUND badpath')
        })
    })

    test('It should return a succes message when all the given parameters are correct', () => {
        console.log = jest.fn()
        mockCwd('D:/dev/mongo seeder/examples', async () => {
            await main.main('mongodb://localhost:27017/', 100, 'test', 'test', './templates/test-tmpl.json', false).then(() => {
                expect(console.log).toHaveBeenNthCalledWith(2, 'Database seeded!')
                expect(console.log).toHaveBeenNthCalledWith(3, 'Db connection closed.')
            })
        })
	})

    
})

