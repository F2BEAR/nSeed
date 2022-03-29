const { stat } = require('fs')
const path = require('path')
const { promisify } = require('util')

const fsStat = promisify(stat)

const fileExists = async (path) => {
  try {
    const stat = await fsStat(path).catch((err) => {
      throw new Error(err)
    })
    const file = stat.isFile()
    return { exists: true, isFile: file }
  } catch (err) {
    const message = err.message
    return { exists: false, message: message }
  }
}

module.exports.hasTemplate = async (tmpPath) => {
  const exists = await fileExists(tmpPath)
  return exists
}

module.exports.hasConfig = async () => {
  try {
    const configPath = path.join(process.cwd(), 'seedit.config.json')
    const files = await fileExists(configPath)
    if (files.exists === true && files.isFile === true) {
      const config = require(configPath)
      return { exists: files.exists, config: config }
    } else {
      return files
    }
  } catch (err) {
    console.error(err)
  }
}
