/**
 * Copyright (c) 2022 Facundo Carbonel / nSeed
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { MongoClient } = require('mongodb')
module.exports.dbconnect = async (uri: string, db: string, collectionName: string, del: boolean) => {
    try {
      console.log(uri)
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        maxIdleTimeMS: 5000
      })
      await client.connect().catch((err: any | unknown) => {
        throw new Error(err.message)
      })
      console.log(`Correctly connected to the database ${db}/${collectionName}`)
      const collection = client
        .db(db, { writeConcern: 'majority' })
        .collection(collectionName)
      if (del === true) {
        collection.drop().catch((err: any | unknown) => {
          throw new Error(err.message)
        })
      }
      return ({ collection, client })
    } catch (err: any | unknown) {
        console.error(err.message)
      process.exit(0)
    }
  }