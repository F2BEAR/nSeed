import { fileExists } from './utils';
import { join } from 'path';

export class Template {
	templateExist: boolean;
	path?: string = '';
	completePath?: string = '';

	constructor() {
		this.templateExist = false;
	};

	checkForTmpl(path: string): boolean {
		this.path = path;
		const completePath: string = join(process.cwd(), this.path);
		const file = fileExists(completePath);
		if (file.exists && file.isFile === true) {
			this.templateExist = true;
			this.completePath = completePath;
			return this.templateExist;
		} else {
			this.templateExist = false;
			return this.templateExist;
		};
	};

	parseTmpl(): Promise<Object | string> {
		return new Promise(async (resolve, reject) => {
			if (this.completePath !== undefined && this.templateExist) {
				const seed: any = {};
				await import(this.completePath)
					.then((tmpl) => {
						if (typeof tmpl.default === 'function') {
							Object.assign(seed, tmpl.default());
						} else {
							reject(
								'The template must be an exported unnamed function which returns an object with the Template.\n\nFor more information review the documentation here:\nhttps://github.com/F2BEAR/nSeed#templates'
							);
						};
					})
					.catch((err) => {
						reject(new Error(err));
					});
				resolve(seed);
			} else {
				reject('There was a problem with the given path');
			};
		});
	};
};
