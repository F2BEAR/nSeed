import { seedGen, seeder } from './seeder';
import { dbconnect, Connection } from './connection';

export const main = async (
	uri: string,
	amount: number | string,
	db: string,
	collection: string,
	path: string,
	del: boolean
) => {
	try {
		const connection: Connection = await dbconnect(uri, db, collection, del);
		if (connection.error) {
			console.error(`\nError: ${connection.message}`);
			return;
		}
		if (typeof amount === "string") amount = parseInt(amount);
		const seed: Object[] | undefined = await seedGen(amount, path);
		if (seed === undefined) {
			await connection?.client?.close();
			throw new Error('There is nothing to seed.');
		} else {
			await seeder(amount, seed, connection);
			return;
		};
	} catch (err: any | unknown) {
		console.error(err.message);
		return;
	};
};
