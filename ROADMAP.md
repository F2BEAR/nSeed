# Project Roadmap

The intention of this file is to provide an easy-to-read document describing the current status and upcoming milestones for this project. 

All milestones listed here MUST include:

- Name
- Description
- Status _('released', 'upcoming', 'future')_

Milestones MUST be ordered chronologically, beginning with the early milestones into the future.

> Note: If the Status of the milestone is 'released' it is pertinent to add the date and version for the release on the Description section.

# nSeed - _v1.0.0_

- Basic CLI Functionalities | Released - v1.0.0 

  _nSeed_ is a CLI tool, so to start with, it must read, parse and validate user's input for required and unrequired fields such as the Database URI, the template's path, the amount of documents to be generated, etc.

- Database Connection | Released v1.0.0

  The purpose of this tool is to be an easy-to-use database seeder, so the capability to be connected to a database is clearly a must.

- Seed Generator | Released - v1.0.0

  A function which generates seeds to be saved into the database based on the amount declared in the user's input.

- Data template | Released - v1.0.0

  This tool must be capable of reading, parsing and validate the data template which will be used to generate the seeds.

- Config files | Released - v1.0.0

  _nSeed_ must work without any user input if a config file is properly set in the _current working directory._

- nSeed config on package.json | Upcoming
  
  We believe the idea of configuring _nSeed_ within your package.json file it's a really good option, specially if you don't like to have tons of files on your root folder.

- SQL Support | Upcoming

  By now, the only kind of databases supported by this tool are MongoDB's databases but we also want to support SQL databases as well.

- Seed more than one Database at the same time | Future

  We think that it will be handy if you can seed more than just one database (or collections), based on different templates with their own amount.

  This should be possible with both CLI arguments and config files.

- Plugins | Future

  Plugins are a great way to grant the user with a level of extensibility for the tools they use. With that in mind, we truly believe that the capability to use (or create) Plugins gives a great advantage to the user, making this tool the flexibility needed to cope with the user's needs.

- Richer Templates | Future

  It will be really helpful if we could set _nSeed_ to have unique, required and unrequired (with a percentage of appearance) values through objects on the template describing how often or not they should be generated when we seed our databases.
   
- nSeed own data generator | Future

  By now nSeed depends on [Faker.js](https://fakerjs.dev) to generate the data to be seeded and we think that it will be best-suited if we have or own data generator.
