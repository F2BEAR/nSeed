const utils = require('../src/utils')
const { mockCwd } = require('mock-cwd')

describe('Test the utils.js functions', () => {

	test('The hasConfig() function should return the config file when it exists', () => {
        mockCwd('D:/dev/mongo seeder/examples', async () => {
            await utils.hasConfig().then((result) => {
                expect(result).toStrictEqual(
                    expect.objectContaining({
                        exists: true, 
                        config: {
                            "url": "mongodb://localhost:27017/",
                            "db": "test",
                            "collections": {
                                "name": "test-users",
                                "path": "/templates/users.json"
                            },
                            "amount": 1000,
                            "delete": true
                        } 
                    })
                )
            })
        })
	})

    test('The hasTemplate() function should return true when it exists', () => {
        mockCwd('D:/dev/mongo seeder/examples', async () => {
            await utils.hasTemplate('./examples/templates/users.json').then((result) => {
                expect(result).toStrictEqual(
                    expect.objectContaining({
                        exists: true, 
                        isFile: true
                    })
                )
            })
        })
	})

    test('The hasConfig() function should return false when it does not exist', () => {
        mockCwd('/bad-path', async () => {
            await utils.hasConfig('/does-not-exist').then((result) => {
                expect(result).toStrictEqual(
                    expect.objectContaining({
                        exists: false, 
                        message: "Error: ENOENT: no such file or directory, stat 'D:\\bad-path\\seedit.config.json'"
                    })
                )
            })
        })
	})

    test('The hasTemplate() function should return false when it does not exist', () => {
        mockCwd('/bad-path', async () => {
            await utils.hasTemplate('/does-not-exist').then((result) => {
                expect(result).toStrictEqual(
                    expect.objectContaining({
                        exists: false, 
                        message: "Error: ENOENT: no such file or directory, stat 'D:\\does-not-exist'"
                    })
                )
            })
        })
	})
})

