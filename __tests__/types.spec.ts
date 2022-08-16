import { Types } from '../src/types'
import { Faker } from '@faker-js/faker'
import { ObjectId } from 'mongodb'

describe('Tests the types.ts functionalities', () => {
    const types = new Types()

    test('Types.faker is a valid Faker class instance', () => {
        expect(types.faker).toBeInstanceOf(Faker)
    })

    test('Types.oneOf() should return one of the values of the given Array', () => {
        const arr = ['john', 'doe', 'foo', 'bar']
        const result = types.oneOf(arr)
        expect(arr.includes(result)).toBeTruthy()
    })

    test('Types.oneOf() should throw an error when no value is provided', () => {
        console.error = jest.fn()
        types.oneOf(undefined)
        expect(console.error).toBeCalledWith('\nError: An Array must be provided as a parameter for oneOf(), received undefined instead')
    })

    test('Types.newDate() returns an instance of Date', () => {
        const returCurrentDate = types.newDate(undefined)
        const returnSpecificDate = types.newDate('12/04/2020')
        expect(returCurrentDate).toBeInstanceOf(Date)
        expect(returnSpecificDate).toBeInstanceOf(Date)
    })

    test('Types.id() returns an instance of ObjectID', () => {
        const randomId = types.id(undefined)
        const specificId = types.id('603d2a25e7575c1780f3d08c')
        expect(randomId).toBeInstanceOf(ObjectId)
        expect(specificId).toBeInstanceOf(ObjectId)

    })
})