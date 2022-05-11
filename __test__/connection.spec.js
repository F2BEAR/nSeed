const { dbconnect } = require('../src/connection')

describe('Test the dbconnect function', () => {
    jest.setTimeout(50000)
    test('It should return a success message when a valid connection string is given', async () => {
        console.log = jest.fn()
        await dbconnect('mongodb://localhost:27017/', 'test', 'test', false).then(() => {
            expect(console.log).toBeCalledWith('Correctly connected to the database test/test')
        })
	})
    test('it should throw an error message when an invalid connection string is given', async () => {
        console.error = jest.fn()
        await dbconnect('mongodb://baduri:27017/', 'test', 'test', false).then(() => {
            expect(console.error).toBeCalledWith('Error: getaddrinfo ENOTFOUND baduri')
        })
    })
    test('It should return a confirmation when the database is dropped', async () => {
        console.log = jest.fn()
        await dbconnect('mongodb://localhost:27017/', 'test', 'users', true).then(() => {
            expect(console.log).toHaveBeenNthCalledWith(3,'DB Dropped')
        })
	})
    test('It should return an error when intends to drop a collection that does not exist', async () => {
        console.log = jest.fn()
        await dbconnect('mongodb://localhost:27017/', 'test', 'users', true).then(() => {
            expect(console.log).toHaveBeenNthCalledWith(3,'The collection can\'t be deleted because it does not exist.')
        })
    })
})

