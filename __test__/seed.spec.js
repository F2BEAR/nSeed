const { mockCwd } = require('mock-cwd')
const ProgressBar = require('progress')
const seed = require('../src/seed')

describe('Test the src/seed functions', () => {
    test('It should return an error message when a invalid path is given', async () => {
        const progress = new ProgressBar('Seeding [:bar] :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: 100
          })
        console.error = jest.fn()
        await seed.seed(100, './templates/test-tmpl.json', progress).then(() => {
            expect(console.error).toHaveBeenCalledWith('There was a problem with the provided path')
        })
	})

    test('It should return a seed when a valid path is given', async () => {
        mockCwd('D:/dev/mongo seeder/examples', async () => {
            const progress = new ProgressBar('Seeding [:bar] :percent :etas', {
                complete: '=',
                incomplete: ' ',
                width: 20,
                total: 1
                })
            await seed.seed(1, './templates/test-tmpl.json', progress).then((result) => {
                expect(result).toStrictEqual(
                    expect.objectContaining([{
                        "firstName": "Joe",
                        "lastName": "Doe",
                        "gender": "foo",
                        "job": "bar"
                    }])
                )
            })
        })
    })
})
