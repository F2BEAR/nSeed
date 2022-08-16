import { seedGen, seeder} from '../src/seeder'
import { dbconnect } from '../src/connection'
import { mockCwd } from 'mock-cwd'
import { join } from 'path'

describe('Test the src/seed functions', () => {
    beforeEach(() => jest.restoreAllMocks())
    jest.setTimeout(50000)
    console.log = jest.fn()
    console.error = jest.fn()

    test('It should return a seed when a valid path is given', async () => {
        mockCwd(join(process.cwd(),'/examples'), async () => {
            await seedGen(1, './templates/test-tmpl.js').then((result) => {
                expect(result).toStrictEqual(
                    expect.arrayContaining([{
                        "firstName": "Joe",
                        "lastName": "Doe",
                        "gender": "foo",
                        "job": "bar"
                    }])
                )
            })
        })
    })

    test('It should return an error message when a invalid path is given', async () => {
        await seedGen(1, './templates/test-tmpl.js').then(() => {
            expect(console.error).toHaveBeenCalledWith('\nSeeder Error: There was a problem with the provided path')
        })
	})

    test('It should return an error when the parseTmpl() returns an error', () => {
        mockCwd(join(process.cwd(),'/examples'), async () => {
            await seedGen(1, './templates/test-bad-temp.js').then(() => {
                expect(console.error).toHaveBeenCalledWith('\nSeeder Error: The template must be an exported unnamed function which returns an object with the Template.\n\nFor more information review the documentation here:\nhttps://github.com/F2BEAR/nSeed/blob/master/README.md')
            })
        })
    })

    test('seeder() should seed the db with the given seed', async () => {
        const connection = await dbconnect('mongodb://localhost:27017', 'test', 'test', false)
        const seed = [{
            firstName: 'Joe',
            lastName: 'Doe',
            gender: 'foo',
            job: 'bar'
        }]
        await seeder(1, seed, connection)
        expect(console.log).toHaveBeenNthCalledWith(3,'Database seeded!') 
        expect(console.log).toHaveBeenNthCalledWith(4,'Db connection closed.')
    })

    test('seeder() should return an error when no seed is given', async () => {
        await seeder(1, [{}], {}).then(() => {
            expect(console.error).toHaveBeenCalledWith('\nError: Something whent wrong while seeding')
        })
    })
})
