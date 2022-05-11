/**
 * Copyright (c) 2022 Facundo Carbonel / nSeed
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const ProgressBar = require('progress')
const { seed } = require('./seed')
const {dbconnect} = require('./connection')

const seeder = async (progress: { tick: (arg0: number) => void }, pending: number, seeds: any[], db: { collection?: any; client?: any, error?: boolean, message?: string}) => {
  try {
    let i = 0
    while (pending > 0) {
      const seed = seeds[i]
      if (seed !== undefined) {
        delete seed._id
      }
    	await db.collection.insertOne(seed)
        .then((item: { acknowledged: boolean }) => {
          if (item.acknowledged === true) {
            progress.tick(1)
            pending -= 1
            i += 1
          }
        })
        .catch((err: any | unknown) => {
          throw new Error(err)
        })
    }
    if (pending === 0) {
      console.log('Database seeded!')
    }
  } catch (err) {
    console.error(err)
  } finally {
    db.client.close()
    console.log('Db connection closed.')
  }
}

exports.seeder = seeder

exports.main = async (uri: string, amount: any, db: string, collectionName: string, path: string, del: boolean) => {
  try {
    await dbconnect(uri, db, collectionName, del)
      .then(async (connection: { collection?: any; client?: any, error?: boolean, message?: string}) => {
        if (connection.error) {
          console.error(connection.message)
          return
        }
        const length = parseInt(amount)
        const pending = length
        const seedProgress = new ProgressBar('Generating the seeds [:bar] :percent :etas', {
          complete: '=',
          incomplete: ' ',
          width: 20,
          total: length
        })
        const progress = new ProgressBar('Seeding [:bar] :percent :etas', {
          complete: '=',
          incomplete: ' ',
          width: 20,
          total: length
        })
        await seed(amount, path, seedProgress).then(async (seed: undefined | any[]) => {
          if (seed === undefined) {
            throw new Error('\nnSeed Closed.')
          } else {
            progress.tick(0)
            await seeder(progress, pending, seed, connection)
          }
          
        })
      })
  } catch (err: any | unknown) {
    console.error(err.message)
    process.exit(5)
  }
}
