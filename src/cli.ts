import inquirer, {Question} from 'inquirer';
import arg from 'arg';
import { help } from './help';
import { hasConfig, Config, FileExists } from './utils';
import { main } from './main';

interface Options extends Config {
	version: boolean,
	help: boolean,
	delete: boolean
};

const parseArguments = (): Options | undefined => {
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

				'-h': '--help',
				'-v': '--version',
				'-a': '--amount',
				'-t': '--tmpl',
				'-c': '--collection',
				'-d': '--db'
			},
			{
				argv: process.argv.slice(2)
			}
		);
		return {
			url: process.argv[2],
			version: args['--version'] ?? false,
			help: args['--help'] ?? false,
			delete: args['--del'] ?? false,
			template: args['--tmpl'] ?? '',
			amount: args['--amount'] ?? 0,
			collection: args['--collection'] ?? '',
			db: args['--db'] ?? ''
		};
	} catch (err: any | unknown) {
		console.error(`Error: ${err.message}`);
		return;
	};
};

const promptForMissingOptions = async (
	options: Options
): Promise<undefined | Options> => {
	const questions: Question<Config>[] = [];

	questions.push({
		type: 'input',
		name: 'url',
		message: 'Specify a valid MongoDB connection string',
		when: !options.url || options.url === ''
	});

	questions.push({
		type: 'input',
		name: 'template',
		message: 'Specify the path for the templates',
		when: !options.template || options.template === ''
	});

	questions.push({
		type: 'input',
		name: 'db',
		message: "Specify the Database's name",
		when: !options.db || options.db === ''
	});

	questions.push({
		type: 'input',
		name: 'collection',
		message: "Specify the Collection's name",
		when: !options.collection || options.collection === ''
	});

	questions.push({
		type: 'number',
		name: 'amount',
		message: 'Specify the amount of documents to be generated',
		when: !options.amount
	});

	const answers: Config = await inquirer.prompt(questions);

	const uriRegex = /^(mongodb(?:\+srv)?\:\/{2})(\w+\:\w+\@)?(\w+?(?:\.\w+?)*)(\:\d+)?(\/(\w+)?)?(\?\w+\=\w+(?:\&\w+\=\w+)*)?$/gm
	.test(
		options.url ? options.url : answers.url
	);

	if (!uriRegex) {
		console.error('\nError: you must provide a valid MongoDB connection string.');
		return;
	};

	const amountChk = /^\d+$/i
	.test(
		options.amount ? options.amount.toString() : answers.amount.toString()
	);

	if (!amountChk) {
		console.error('\nError: The amount must be a number');
		return;
	};

	const tmplCheck = /^(\.{1,2}\/)+([\w-]+\/)*([\w-]+\.js)$/gm
	.test(
		options.template ? options.template : answers.template
	);

	if (!tmplCheck) {
		console.error('\nError: The provided path for the config does not comply with the relative path format (i.e: ./*/*.js)');
		return;
	};

	return {
		...options,
		url: options.url || answers.url,
		template: options.template || answers.template,
		collection: options.collection || answers.collection,
		amount: options.amount || answers.amount,
		db: options.db || answers.db,
		delete: options.delete
	};
};

const helper = (options: Options) => {
	options.version ? console.log(process.env.npm_package_version) : help();
};

export const cli = async (): Promise<void> => {
	let options: Options | undefined = parseArguments();
	if (options !== undefined) {
		if (options.version || options.help) return helper(options);
		const del = false;
		const configFile: FileExists = await hasConfig();
		if (configFile.exists) {
			const config: Config | undefined = configFile.config;
			if (config !== undefined) {
				console.log('Using config file')
				options.url = config.url;
				options.amount = config.amount;
				options.db = config.db;
				options.collection = config.collection;
				options.template = config.template;
				options.delete = config.delete ?? del;
			};
		};
		options = await promptForMissingOptions(options);
		if (options !== undefined) {
			await main(
				options.url,
				options.amount,
				options.db,
				options.collection,
				options.template,
				options.delete
			);
		};
	};
	console.log('\nnSeed Closed.');
	return;
};
