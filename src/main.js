const { MongoClient } = require('mongodb')
const ProgressBar = require('progress')
const { seed } = require('./seed')

const dbconnect = async (uri, db, collectionName, del) => {
  try {
    console.log(uri)
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      maxIdleTimeMS: 5000
    })
    await client.connect().catch((err) => {
      throw new Error(err.message)
    })
    console.log(`Correctly connected to the database ${db}/${collectionName}`)
    const collection = client
      .db(db, { writeConcern: 'majority' })
      .collection(collectionName)
    if (del === true) {
      collection.drop().catch((err) => {
        throw new Error(err.message)
      })
    }
    return ({ collection, client })
  } catch (err) {
	  console.error(err.message)
    process.exit(0)
  }
}

const seeder = async (progress, pending, seeds, db) => {
  try {
    let i = 0
    while (pending > 0) {
      const seed = seeds[i]
      if (seed !== undefined) {
        delete seed._id
      }
    	await db.collection.insertOne(seed)
        .then((item) => {
          if (item.acknowledged === true) {
            progress.tick(1)
            pending -= 1
            i += 1
          }
        })
        .catch((err) => {
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

module.exports.main = async (uri, amount, db, collectionName, path, del) => {
  try {
    await dbconnect(uri, db, collectionName, del)
      .then(async connection => {
        const length = parseInt(amount, 10)
        const pending = length
        const progress = new ProgressBar('Seeding [:bar] :percent :etas', {
          complete: '=',
          incomplete: ' ',
          width: 20,
          total: length
        })
        const seeds = await seed(amount, path)
        progress.tick(0)
        await seeder(progress, pending, seeds, connection)
      })
  } catch (err) {
    console.error(err)
    process.exit(0)
  }
}
