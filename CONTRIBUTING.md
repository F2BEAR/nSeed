# Contribute

Thanks for considering contributing to this project, we really appreciate it! 

In order for you to make a successfully Pull Request (from now on just PR), there are some considerations you may want to know:

nSeed is a MongoDb seeder so you must have access to a MongoDB instance in order to work an test new features. Instance access for other Databases may also be useful for future releases.

This is a CLI tool so in order to test your fixes/features you may want to use the command `npm link`.

As the [npm documentation says](https://docs.npmjs.com/cli/v8/commands/npm-link): 

> "This is handy for installing your own stuff, so that you can work on it and test iteratively without having to continually rebuild."

nSeed is written on TypeScript; we build it using `npm run build` and the js files will be outputted on the /lib folder. 

You can also use `npm run build:watch` when developing to test the final result behavior. If you have previously used the `npm link` command you will gain the ability to work and test iteratively with the CLI as the "link" would be made onto the /lib directory.

This is due because both main and bin properties on the package.json file are references to files on that directory.

We use ts-standard as the style guide and linter for this project, before submitting any PR we encourage you to run the command `npm run standard` to see if the style of the code is correct and if you see errors use `npm run standard-fix` to solve most of them. 

If you keep seeing errors after running the standard-fix command, review the errors and correct them.

Jest is the test-runner selected for this project; we expect the test coverage to be greater than 95% and no failing tests. If you plan to do a PR, test all the functionalities/fixes you'd made.

We use [commitizen](http://commitizen.github.io/cz-cli/) to do our commits; simply run `npm run commit` on your terminal and you will be prompted with any necessary field. 

If you want to know more about how it works, please refer to their project.
