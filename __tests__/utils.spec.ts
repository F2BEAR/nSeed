import { hasConfig, fileExists, FileExists } from '../src/utils'
import { mockCwd } from 'mock-cwd'
import { join } from 'path'

describe('Test the utils.js functions', () => {

	test('fileExists() should return true when the template exists', () => {
		mockCwd(join(process.cwd(),'/examples'),  () => {
			let res = fileExists('./examples/templates/temp.js')
			expect(res).toMatchObject<FileExists>({
				exists: true,
				isFile: true
			})
		})
	})

	test('fileExists() should return false when it does not exist', () => {
		mockCwd(join(process.cwd(),'/examples'),  () => {
			let res = fileExists('./does-not-exist')
			expect(res).toMatchObject<FileExists>({
				exists: false,
				message: "ENOENT: no such file or directory './does-not-exist'"
			})
		})
	})

	test('hasConfig() should return the config file when it exists', () => {
		mockCwd(join(process.cwd(),'/examples'),  async () => {
			const result = await hasConfig()
			expect(result).toStrictEqual<FileExists>(
				expect.objectContaining({
					exists: true,
					config: {
						"url": "mongodb://localhost:27017/",
						"db": "test",
						"collection": "users",
						"template": "./templates/temp.js",
						"amount": 100,
						"delete": true
					}
				})
			)
		})
	})

	test('hasConfig() should return false when it does not exist', () => {
		mockCwd('./bad-path',  async () => {
			const res = await hasConfig()
	        expect(res).toStrictEqual<FileExists>(
	            expect.objectContaining({
	                exists: false,
	                message: "ENOENT: no such file or directory 'bad-path\\nseed.config.json'"
	            })
	        )
		})
	})
})
