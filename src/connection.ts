import { MongoClient, Collection } from 'mongodb';

export interface Connection {
  collection?: Collection
  client?: MongoClient
  error?: boolean
  message?: string
};

export const dbconnect = async (
  uri: string,
  db: string,
  collectionName: string,
  del: boolean
): Promise<Connection> => {
  try {
    console.log(uri);
    const client:MongoClient = new MongoClient(uri, {
      maxIdleTimeMS: 5000
    });
    await client.connect().catch((err: any | unknown) => {
      throw new Error(err.message);
    });
    console.log(`Correctly connected to the database ${db}/${collectionName}`);
    const collection = client
      .db(db, { writeConcern: { w: 'majority' } })
      .collection(collectionName);
    if (del) {
      const stats = await collection.stats();
      if (stats.size > 0) {
        collection.drop();
        console.log('DB Dropped');
      } else {
        console.log(
          "The collection can't be deleted because it does not exist."
        );
      };
    };
    return { collection, client };
  } catch (err: any | unknown) {
    console.error(err.message);
    return { error: true, message: err.message };
  };
};
