/**
 * Copyright (c) 2022 Facundo Carbonel / nSeed
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const arg = require('arg')
const inquirer = require('inquirer')
const chalk = require('chalk')
const { version } = require('../package.json')
const { help } = require('./help')
const { hasConfig } = require('./utils')
const { main } = require('./main')

const parseArguments = (rawArgs: string | any[]) => {
  try {
    const args = arg(
      {
        '--help': Boolean,
        '--version': Boolean,
        '--tmpl': String,
        '--collection': String,
        '--db': String,
        '--amount': Number,
        '--del': Boolean,

        // Aliases
        '-h': '--help',
        '-v': '--version',
        '-a': '--amount',
        '-t': '--template',
        '-c': '--collection',
        '-d': '--database'
      },
      {
        argv: rawArgs.slice(2)
      }
    )
    return {
      uri: rawArgs[2],
      version: args['--version'] || false,
      help: args['--help'] || false,
      delete: args['--delete'] || false,
      template: args['--template'] || '',
      amount: args['--amount'] || 0,
      collection: args['--collection'] || '',
      db: args['--database'] || ''
    }
  } catch (err: any | unknown) {
    console.error(chalk.red.bold('ERROR:'), err.message)
    process.exit(5)
  }
}

const promptForMissingOptions = async (options: { uri: string; version: boolean; help: boolean; delete: boolean; template: string; amount: any; collection: string; db: string } | undefined) => {
  const questions = []

  if (!options || options === undefined) {
    console.error(chalk.red.bold('ERROR:'), 'No options found')
    process.exit(5)
  }

  // https://regex101.com/r/jxxyRm/1

  const uriRegex = /^(mongodb(?:\+srv)?(\:)(?:\/{2}){1})(?:\w+\:\w+\@)?(\w+?(?:\.\w+?)*)(\:)(\d+(?:\/){0,1})(?:\/\w+?)?(?:\?\w+?\=\w+?(?:\&\w+?\=\w+?)*)?$/gm.test(options.uri)

  if (!uriRegex) {
    console.error(
      chalk.red.bold('Error:'),
      'you must provide a valid MongoDB connection string.'
    )
    console.log(
      'For more info on how this tool works please run seedit --help'
    )
    process.exit(9)
  }

  if (!options.template || options.template === '') {
    questions.push({
      type: 'input',
      name: 'template',
      message: 'Specify the path for the templates'
    })
  }

  if(!options.db || options.db === '') {
    questions.push({
      type: 'input',
      name: 'db',
      message: 'Specify the Database name'
    })
  }

  if (!options.collection || options.collection === '') {
    questions.push({
      type: 'input',
      name: 'collection',
      message: "Specify the Collection's name"
    })
  }

  if (!options.amount) {
    questions.push({
      type: 'input',
      name: 'amount',
      message: 'Specify the amount of documents to be generated'
    })
  }

  const answers = await inquirer.prompt(questions)

  const amountChk = /\d/i.test(options.amount ? options.amount : answers.amount)

  if (!amountChk) {
    console.error(chalk.red.bold('ERROR:'), 'The amount must be a number')
    process.exit(9)
  }

  const tmplCheck = /^(\.{1,2})([\/\w]+)(\w\.json)$/gm.test(options.template ? options.template : answers.template)

  if (!tmplCheck) {
    console.error(chalk.red.bold('ERROR:'), 'The provided path for the template does not comply with the format ./*/*.json')
    process.exit(9)
  }

  return {
    ...options,
    uri: options.uri,
    template: options.template || answers.template,
    collection: options.collection || answers.collection,
    amount: options.amount || answers.amount,
    db: options.db || answers.db,
    delete: options.delete
  }
}

const helper = (options: { uri: string; version: boolean; help: boolean; delete: boolean; template: string; amount: any; collection: string; db: string }) => {
  if (options.version) {
    console.log(version)
  }

  if (options.help) {
    console.log(help())
  }
}

module.exports.cli = async (args: string | any[]) => {
  let options: { uri: string; version: boolean; help: boolean; delete: boolean; template: string; amount: any; collection: string; db: string }= parseArguments(args)
  const del = false
  if (options.version || options.help) {
    helper(options)
  } else {
    await hasConfig()
    .then(async (e: { exists: boolean; config: any }) => {
      if (e.exists) {
        const config = e.config
        await main(
          config.url,
          config.amount,
          config.db,
          config.collection.name,
          config.collection.path,
          config.delete || del
        )
      } else {
        options = await promptForMissingOptions(options)
        await main(
          options.uri,
          options.amount,
          options.db,
          options.collection,
          options.template,
          options.delete
        )
      }
    })
    .catch((err: any | unknown) => {
      console.error(err)
    })
  }
}
