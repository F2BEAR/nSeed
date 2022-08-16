import { Template } from "../src/template";
import { join } from 'path'
const tmpl = new Template()

describe('Test the Template object', () => {

    test('checkForTmpl() should return false if a wrong path is given', () => {
        const result = tmpl.checkForTmpl('./bad-path.js')
        expect(result).toBeFalsy()
    })

    test('checkForTmpl() should return true if a valid path is given', () => {
        const result = tmpl.checkForTmpl('./examples/templates/test-tmpl.js')
        expect(result).toBeTruthy()
        expect(tmpl.completePath).toBe('D:\\dev\\nSeed\\examples\\templates\\test-tmpl.js')
    })    

    test('parseTmpl() should reject if no path is present on the Template instance', async () => {
        const newTmpl = new Template()
        await newTmpl.parseTmpl().catch(err => {
            expect(err).toBe('There was a problem with the given path')
        })  
    })

    test('parseTmpl() should reject if dynamic import fails', async () => {
        const newTmpl = new Template()
        newTmpl.completePath = 'not-a-js-file'
        newTmpl.templateExist = true
        await newTmpl.parseTmpl().catch(err => {
            expect(err).toBeInstanceOf(Error)
        })  
    })
    
    test('parseTmpl() should resolve a seed when a valid path is given', async () => {
        const result = await tmpl.parseTmpl()
        expect(result).toStrictEqual(
            expect.objectContaining({
                firstName: 'Joe',
                lastName: 'Doe',
                gender: 'foo',
                job: 'bar'
            })
        )
    })

    test('parseTmpl() should reject when the template.default exported value is not a function', async () => {
        const newTmpl = new Template()
        newTmpl.completePath = join(process.cwd(),'/examples/templates/test-bad-temp.js')
        newTmpl.templateExist = true
        await newTmpl.parseTmpl().catch(err => {
            expect(err).toBe('The template must be an exported unnamed function which returns an object with the Template.\n\nFor more information review the documentation here:\nhttps://github.com/F2BEAR/nSeed/blob/master/README.md')
        })  
    })
})