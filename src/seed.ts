const { join } = require('path')
const { hasTemplate } = require('./utils')
const { fakerTypes } = require('./types')

const parseTemplate = async (template: string) => {
  const keys = Object.keys(template)
  const size = keys.length
  const values = Object.values(template)
  const seed: any = {}
  for (let i = 0; i < size; i++) {
    const isFaker = values[i].startsWith('.')
    if (isFaker === true) {
      const string = values[i].split('.')
      const type = string[1]
      const value = string[2]
      seed[keys[i]] = await fakerTypes(type, value)
    } else {
      seed[keys[i]] = values[i]
    }
  }
  return (seed)
}

module.exports.seed = async (amount: number, path:string, progress: { tick: (arg0: number) => void }) => {
  try {
    const completePath = join(process.cwd(), path)
    console.log(path)
    const file = await hasTemplate(completePath)
    if (file.exists === true && file.isFile === true) {
      const template = require(completePath)
      const length = amount
      let pending = length
      progress.tick(0)
      const seeds: {}[] = []
      for (let i = 0; i < amount; i++) {
        progress.tick(1)
        await parseTemplate(template).then(tmpl => {
          seeds.push(tmpl)
          pending -= 1
        })
      }
      if (pending === 0) {
        return (seeds)
      }
    } else {
      throw new Error('There was a problem with the provided path')
    }
  } catch (err) {
    console.error(err)
    process.exit(0)
  }
}