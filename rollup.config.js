import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import cleanup from 'rollup-plugin-cleanup'
import shebang from 'rollup-plugin-preserve-shebang'
import license from 'rollup-plugin-license'

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'lib/main.min.js',
				format: 'cjs',
				sourcemap: false,
				exports: 'named'
			}
		],
		external: [
			'inquirer',
			'arg',
			'@faker-js/faker',
			'mongodb',
			'path',
			'cli-table',
			'fs',
			'util',
			'progress'
		],
		plugins: [
			license({
				banner:
					'Copyright (c) 2022 Facundo Carbonel / nSeed\n\nThis source code is licensed under the MIT license found in the\nLICENSE file in the root directory of this source tree.'
			}),
			shebang(),
			cleanup({ comments: 'license' }),
			process.env.NODE_ENV === 'production' &&
				terser({
					output: {
						comments: true
					}
				}),
			typescript({tsconfig: "./tsconfig.build.json"})
		]
	},
	{
		input: `src/index.ts`,
		plugins: [dts()],
		output: {
			file: `lib/main.d.ts`,
			format: 'es'
		}
	}
]
