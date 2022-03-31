const Table = require('cli-table')
module.exports.help = () => {
  const header = '  @@@@@@   @@@@@@@@  @@@@@@@@  @@@@@@@      @@@  @@@@@@@\n  @@@@@@@   @@@@@@@@  @@@@@@@@  @@@@@@@@     @@@  @@@@@@@\n  !@@       @@!       @@!       @@!  @@@     @@!    @@!  \n  !@!       !@!       !@!       !@!  @!@     !@!    !@!  \n  !!@@!!    @!!!:!    @!!!:!    @!@  !@!     !!@    @!!  \n   !!@!!!   !!!!!:    !!!!!:    !@!  !!!     !!!    !!!  \n       !:!  !!:       !!:       !!:  !!!     !!:    !!:  \n      !:!   :!:       :!:       :!:  !:!     :!:    :!:  \n  :::::::   ::::::::  ::::::::  ::::::::     :::    :::  \n  ::::::    :::::::   :::::::   :::::::      :::    :::  '
  console.log('\n', header)
  console.log('\nThe Node.Js Data Seeder')
  console.log('\nBasic Usage:\nseedit [connection string] [options]')
  console.log(
      '\nExample: seedit mongodb+srv://user:pwd@my.server.com:27017/DbName?tls=true\n'
  )

  console.log(
    'You can also configure Seed It with a seedit.config.json file on the directory you are working.\n'
  )

  const table = new Table({
    head: ['Option', 'Alias', 'Description']
  })

  table.push(
    ['--db', '-d', 'Flag used to specify the name of the database to be seeded.'],
    ['--collection', '-c', 'A string denoting the name of the collection to be generated.'],
    ['--tmpl', '-t', 'A Flag to specify the path for the templates to be used.'],
    ['--amount', '-a', 'The number of documents to be generated.'],
    ['--del', 'N/A', 'Indicates that the database must be droped before seeding.'],
    ['--version', '-v', 'Displays the current version.'],
    ['--help', '-h', 'Displays help.']
  )
  
  return table.toString()
}
