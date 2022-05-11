/**
 * Copyright (c) 2022 Facundo Carbonel / nSeed
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const arg = require('arg')
const inquirer = require('inquirer')
const { version } = require('../package.json')
const { help } = require('./help')
const { hasConfig } = require('./utils')
const { main } = require('./main')

interface Options {
  uri: string;
  version: boolean;
  help: boolean;
  delete: boolean;
  template: string;
  amount: any;
  collection: string;
  db: string
} 

const parseArguments = (rawArgs: string | any[] ) => {
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
        '-t': '--tmpl',
        '-c': '--collection',
        '-d': '--db'
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
      template: args['--tmpl'] || '',
      amount: args['--amount'] || 0,
      collection: args['--collection'] || '',
      db: args['--db'] || ''
    }
  } catch (err: any | unknown) {
    console.error(`Error: ${err.message}`)
    return
  }
}

const promptForMissingOptions = async (options: Options | undefined) => {
  const questions = []

  if (!options || options === undefined) {
    console.error('Error: No options found')
    return
  }

  if (!options.uri || options.uri === '') {
    questions.push({
      type: 'input',
      name: 'uri',
      message: 'Specify a valid MongoDB connection string'
    })
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
      message: "Specify the Database's name"
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

  // https://regex101.com/r/jxxyRm/3

  const uriRegex = /^(mongodb(?:\+srv)?(\:)(?:\/{2}){1})(?:\w+\:\w+\@)?(\w+?(?:\.\w+?)*)(\:)(\d+(?:\/){0,1})(?:\/\w+?)?(?:\?\w+?\=\w+?(?:\&\w+?\=\w+?)*)?$/gm.test(options.uri ? options.uri : answers.uri)

  if (!uriRegex) {
    console.error(
      '\nError: you must provide a valid MongoDB connection string.'
    )
    console.log(
      'For more info on how this tool works please run seedit --help'
    )
    return
  }
  
  const amountChk = /^\d+$/i.test(options.amount ? options.amount : answers.amount)

  if (!amountChk) {
    console.error('\nError: The amount must be a number')
    return
  }

  // https://regex101.com/r/DW2XBi/5

  const pathRegex = /^((\.{1,2}\/{1})+)(([\w-]+\/)*)(?:([\w-]+)(\.json))$/gm

  const tmplCheck = pathRegex.test(options.template ? options.template : answers.template)

  if (!tmplCheck) {
    console.error('\nError: The provided path for the config does not comply with the relative path format (i.e: ./*/*.json)')
    return
  }

  return {
    ...options,
    uri: options.uri || answers.uri,
    template: options.template || answers.template,
    collection: options.collection || answers.collection,
    amount: options.amount || answers.amount,
    db: options.db || answers.db,
    delete: options.delete
  }
}

const helper = (options: Options) => {
  if (options.version) {
    console.log(version)
  }

  if (options.help) {
    console.log(help())
  }
}

module.exports.cli = async (args: string | any[]) => {
  let options: Options | undefined = parseArguments(args)
  const del = false
  if (options === undefined) {
    return "There was an unexpected error."
  } else {
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
          if (options === undefined) {
            throw new Error('\nnSeed Closed.')
          } else {
            await main(
              options.uri,
              options.amount,
              options.db,
              options.collection,
              options.template,
              options.delete
            )
          }
        }
      })
      .catch((err: any | unknown) => {
        console.error(err.message)
      })
    }
  }
}
