import ProgressBar from 'progress';
import { Template } from './template';
import { Connection } from './connection';

export const seeder = async (pending: number, seeds: Object[], db: Connection) => {
	try {
		const progress = new ProgressBar('Seeding [:bar] :percent :etas', {
			complete: '=',
			incomplete: ' ',
			width: 20,
			total: pending
		});
		progress.tick(0);
		let i = 0;
		while (pending > 0) {
			const seed = seeds[i];
			const insert = await db.collection?.insertOne(seed);
			if (!insert)
				throw new Error('Something whent wrong while seeding');
			if (insert.acknowledged) {
				progress.tick(1);
				pending -= 1;
				i += 1;
			};
		};
		if (pending === 0) {
			console.log('Database seeded!');
		};
	} catch (err) {
		console.error(`\n${err}`);
	} finally {
		db.client?.close()
		console.log('Db connection closed.');
	};
};

export const seedGen = async (
  amount: number,
  path: string
): Promise<any[] | undefined> => {
  try {
    const progress = new ProgressBar(
      'Generating the seeds [:bar] :percent :etas',
      {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: amount
      }
    );
    const tmpl = new Template();
    const checkTmpl = tmpl.checkForTmpl(path);
    if (checkTmpl) {
      const length = amount;
      let pending = length;
      progress.tick(0);
      const seeds: Array<Object> = [];
      for (let i = 0; i < amount; i++) {
        progress.tick(1);
        await tmpl
          .parseTmpl()
          .then((seed) => {
            seeds.push(seed);
            pending -= 1;
          })
          .catch((err) => {
            throw new Error(err);
          });
      };
      if (pending === 0) {
        return seeds;
      };
    } else {
      throw new Error('There was a problem with the provided path');
    };
  } catch (err: any | unknown) {
    console.error(`\nSeeder Error: ${err.message}`);
  };
};
