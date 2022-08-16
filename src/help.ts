import Table from 'cli-table';

export const help = () => {
  console.log('\n            /$$$$$$                            /$$\n           /$$__  $$                          | $$\n /$$$$$$$ | $$  \\__/  /$$$$$$   /$$$$$$   /$$$$$$$\n| $$__  $$|  $$$$$$  /$$__  $$ /$$__  $$ /$$__  $$\n| $$  \\ $$ \\____  $$| $$$$$$$$| $$$$$$$$| $$  | $$\n| $$  | $$ /$$  \\ $$| $$_____/| $$_____/| $$  | $$\n| $$  | $$|  $$$$$$/|  $$$$$$$|  $$$$$$$|  $$$$$$$\n|__/  |__/ \\______/  \\_______/ \\_______/ \\_______/');
  console.log('\nThe Node.Js Database Seeder');
  console.log('\nBasic Usage:\nnseed [connection string] [options]');
  console.log('\nExample: nseed mongodb+srv://user:pwd@my.server.com:27017/DbName?tls=true\n');

  console.log(
    'You can also configure nSeed with a nseed.config.json file on the directory you are working.\n'
  );

  const table = new Table({
    head: ['Option', 'Alias', 'Description']
  });

  table.push(
    [
      '--db',
      '-d',
      'Flag used to specify the name of the database to be seeded.'
    ],
    [
      '--collection',
      '-c',
      'A string denoting the name of the collection to be generated.'
    ],
    [
      '--tmpl',
      '-t',
      'A Flag to specify the path for the templates to be used.'
    ],
    ['--amount', '-a', 'The number of documents to be generated.'],
    [
      '--del',
      'N/A',
      'Indicates that the database must be dropped before seeding.'
    ],
    ['--version', '-v', 'Displays the current version.'],
    ['--help', '-h', 'Displays help.']
  );

  console.log(table.toString());
  console.log(
    'For more information review the documentation here:\nhttps://github.com/F2BEAR/nSeed/blob/master/README.md'
  );
  console.log('\nHappy Seeding!');
};
