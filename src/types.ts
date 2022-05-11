/**
 * Copyright (c) 2022 Facundo Carbonel / nSeed
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const {faker} = require('@faker-js/faker')
const { ObjectId } = require('mongodb')

const id = async (value: string | undefined | null) => {
  if (value === undefined || value === '' || value === null) {
    const newId = new ObjectId()
    return newId
  } else {
    return ObjectId.createFromHexString(value)
  }
}

const newDate = async (value: string | undefined | null) => {
  if (value === undefined || value === '' || value === null) {
    return new Date()
  } else {
    return new Date(value) 
  }
}

const address = async (value: string) => {
  switch (value) {
    case 'cardinalDirection':
      return faker.address.cardinalDirection()
    case 'city':
      return faker.address.city()
    case 'cityName':
      return faker.address.cityName()
    case 'cityPrefix':
      return faker.address.cityPrefix()
    case 'citySuffix':
      return faker.address.citySuffix()
    case 'countryCode':
      return faker.address.countryCode()
    case 'county':
      return faker.address.county()
    case 'direction':
      return faker.address.direction()
    case 'latitude':
      return faker.address.latitude()
    case 'longitude':
      return faker.address.longitude()
    case 'nearbyGPSCoordinate':
      return faker.address.nearbyGPSCoordinate()
    case 'ordinalDirection':
      return faker.address.ordinalDirection()
    case 'secondaryAddress':
      return faker.address.secondaryAddress()
    case 'state':
      return faker.address.state()
    case 'stateAbbr':
      return faker.address.stateAbbr()
    case 'streetAddress':
      return faker.address.streetAddress()
    case 'streetName':
      return faker.address.streetName()
    case 'streetPrefix':
      return faker.address.streetPrefix()
    case 'streetSuffix':
      return faker.address.streetSuffix()
    case 'timeZone':
      return faker.address.timeZone()
    case 'zipCode':
      return faker.address.zipCode()
    case 'zipCodeByState':
      return faker.address.zipCodeByState()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const animals = async (value: string) => {
  switch (value) {
    case 'bear':
      return faker.internet.bear()
    case 'bird':
      return faker.internet.bird()
    case 'cat':
      return faker.internet.cat()
    case 'cetacean':
      return faker.internet.cetacean()
    case 'cow':
      return faker.internet.cow()
    case 'crocodilia':
      return faker.internet.crocodilia()
    case 'dog':
      return faker.internet.dog()
    case 'fish':
      return faker.internet.fish()
    case 'horse':
      return faker.internet.horse()
    case 'insect':
      return faker.internet.insect()
    case 'lion':
      return faker.internet.lion()
    case 'rabbit':
      return faker.internet.rabbit()
    case 'snake':
      return faker.internet.snake()
    case 'type':
      return faker.internet.type()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const commerce = async (value: string) => {
  switch (value) {
    case 'color':
      return faker.commerce.color()
    case 'department':
      return faker.commerce.department()
    case 'price':
      return faker.commerce.price()
    case 'product':
      return faker.commerce.product()
    case 'productAdjective':
      return faker.commerce.productAdjective()
    case 'productDescription':
      return faker.commerce.productDescription()
    case 'productMaterial':
      return faker.commerce.productMaterial()
    case 'productName':
      return faker.commerce.productName()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const company = async (value: string) => {
  switch (value) {
    case 'bs':
      return faker.company.bs()
    case 'bsAdjective':
      return faker.company.bsAdjective()
    case 'bsBuzz':
      return faker.company.bsBuzz()
    case 'bsNoun':
      return faker.company.bsNoun()
    case 'catchPhrase':
      return faker.company.catchPhrase()
    case 'catchPhraseAdjective':
      return faker.company.catchPhraseAdjective()
    case 'catchPhraseDescriptor':
      return faker.company.catchPhraseDescriptor()
    case 'catchPhraseNoun':
      return faker.company.catchPhraseNoun()
    case 'companyName':
      return faker.company.companyName()
    case 'companySuffix':
      return faker.company.companySuffix()
    case 'suffixes':
      return faker.company.suffixes()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const database = async (value: string) => {
  switch (value) {
    case 'collation':
      return faker.database.collation()
    case 'column':
      return faker.database.column()
    case 'engine':
      return faker.database.engine()
    case 'type':
      return faker.database.type()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const datatype = async (value:string) => {
  switch (value) {
    case 'array':
      return faker.datatype.array()
    case 'bigInt':
      return faker.datatype.bigInt()
    case 'boolean':
      return faker.datatype.boolean()
    case 'datetime':
      return faker.datatype.datetime()
    case 'float':
      return faker.datatype.float()
    case 'hexaDecimal':
      return faker.datatype.hexaDecimal()
    case 'json':
      return faker.datatype.json()
    case 'number':
      return faker.datatype.number()
    case 'string':
      return faker.datatype.string()
    case 'uuid':
      return faker.datatype.uuid()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const date = async (value: string) => {
  switch (value) {
    case 'between':
      return faker.date.between()
    case 'betweens':
      return faker.date.paragraph()
    case 'future':
      return faker.lorem.future()
    case 'month':
      return faker.date.month()
    case 'past':
      return faker.date.past()
    case 'recent':
      return faker.date.recent()
    case 'soon':
      return faker.date.soon()
    case 'weekday':
      return faker.date.weekday()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const finance = async (value: string) => {
  switch (value) {
    case 'account':
      return faker.finance.account()
    case 'accountName':
      return faker.finance.accountName()
    case 'amount':
      return faker.finance.amount()
    case 'bic':
      return faker.finance.bic()
    case 'bitcoinAddress':
      return faker.finance.bitcoinAddress()
    case 'creditCardCVV':
      return faker.finance.creditCardCVV()
    case 'creditCardNumber':
      return faker.finance.creditCardNumber()
    case 'currencyCode':
      return faker.finance.currencyCode()
    case 'currencyName':
      return faker.finance.currencyName()
    case 'currencySymbol':
      return faker.finance.currencySymbol()
    case 'ethereumAddress':
      return faker.finance.ethereumAddress()
    case 'iban':
      return faker.finance.iban()
    case 'litecoinAddress':
      return faker.finance.litecoinAddress()
    case 'mask':
      return faker.finance.mask()
    case 'routingNumber':
      return faker.finance.routingNumber()
    case 'transactionDescription':
      return faker.finance.transactionDescription()
    case 'transactionType':
      return faker.finance.transactionType()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const git = async (value: string) => {
  switch (value) {
    case 'branch':
      return faker.git.branch()
    case 'commitEntry':
      return faker.git.commitEntry()
    case 'commitMessage':
      return faker.git.commitMessage()
    case 'commitSha':
      return faker.git.commitSha()
    case 'shortSha':
      return faker.git.shortSha()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const hacker = async (value: string) => {
  switch (value) {
    case 'abbreviation':
      return faker.hacker.abbreviation()
    case 'adjective':
      return faker.hacker.adjective()
    case 'ingverb':
      return faker.hacker.ingverb()
    case 'noun':
      return faker.hacker.noun()
    case 'phrase':
      return faker.hacker.phrase()
    case 'verb':
      return faker.hacker.verb()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const helpers = async (value: string) => {
  switch (value) {
    case 'contextualCard':
      return faker.helpers.contextualCard()
    case 'createCard':
      return faker.helpers.createCard()
    case 'createTransaction':
      return faker.helpers.createTransaction()
    case 'userCard':
      return faker.helpers.userCard()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const image = async (value: string) => {
  switch (value) {
    case 'abstract':
      return faker.image.abstract()
    case 'animals':
      return faker.image.animals()
    case 'avatar':
      return faker.image.avatar()
    case 'business':
      return faker.image.business()
    case 'cats':
      return faker.image.cats()
    case 'city':
      return faker.image.city()
    case 'dataUri':
      return faker.image.dataUri()
    case 'fashion':
      return faker.image.fashion()
    case 'food':
      return faker.image.food()
    case 'image':
      return faker.image.image()
    case 'imageUrl':
      return faker.image.imageUrl()
    case 'nature':
      return faker.image.nature()
    case 'nightlife':
      return faker.image.nightlife()
    case 'people':
      return faker.image.people()
    case 'sports':
      return faker.image.sports()
    case 'technics':
      return faker.image.technics()
    case 'transport':
      return faker.image.transport()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const internet = async (value: string) => {
  switch (value) {
    case 'avatar':
      return faker.lorem.avatar()
    case 'color':
      return faker.internet.color()
    case 'domainName':
      return faker.internet.domainName()
    case 'domainSuffix':
      return faker.internet.domainSuffix()
    case 'domainWord':
      return faker.internet.domainWord()
    case 'email':
      return faker.internet.email()
    case 'exampleEmail':
      return faker.internet.exampleEmail()
    case 'httpMethod':
      return faker.internet.httpMethod()
    case 'ip':
      return faker.internet.ip()
    case 'ipv6':
      return faker.internet.ipv6()
    case 'mac':
      return faker.internet.mac()
    case 'password':
      return faker.internet.password()
    case 'port':
      return faker.internet.port()
    case 'protocol':
      return faker.internet.protocol()
    case 'url':
      return faker.internet.url()
    case 'userAgent':
      return faker.internet.userAgent()
    case 'userName':
      return faker.internet.userName()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const lorem = async (value: string) => {
  switch (value) {
    case 'lines':
      return faker.lorem.lines()
    case 'paragraph':
      return faker.lorem.paragraph()
    case 'paragraphs':
      return faker.lorem.paragraphs()
    case 'sentences':
      return faker.lorem.sentences()
    case 'slug':
      return faker.lorem.slug()
    case 'text':
      return faker.lorem.text()
    case 'word':
      return faker.lorem.words()
    case 'words':
      return faker.lorem.words()
    case 'sentence':
      return faker.lorem.sentence()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const music = async (value: string) => {
  switch (value) {
    case 'genre':
      return faker.music.genre()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const name = async (value: string) => {
  switch (value) {
    case 'findName':
      return faker.name.findName()
    case 'firstName':
      return faker.name.firstName()
    case 'gender':
      return faker.name.gender()
    case 'jobArea':
      return faker.name.jobArea()
    case 'jobDescriptor':
      return faker.name.jobDescriptor()
    case 'jobTitle':
      return faker.name.jobTitle()
    case 'jobType':
      return faker.name.jobType()
    case 'lastName':
      return faker.name.lastName()
    case 'middleName':
      return faker.name.middleName()
    case 'prefix':
      return faker.name.prefix()
    case 'suffix':
      return faker.name.suffix()
    case 'title':
      return faker.name.title()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const phone = async (value: string) => {
  switch (value) {
    case 'phoneFormats':
      return faker.phone.phoneFormats()
    case 'phoneNumber':
      return faker.phone.phoneNumber()
    case 'phoneNumberFormat':
      return faker.phone.phoneNumberFormat()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const random = async (value: string) => {
  switch (value) {
    case 'alpha':
      return faker.random.alpha()
    case 'alphaNumeric':
      return faker.random.alphaNumeric()
    case 'arrayElement':
      return faker.random.arrayElement()
    case 'arrayElements':
      return faker.random.arrayElements()
    case 'locale':
      return faker.random.locale()
    case 'word':
      return faker.random.word()
    case 'words':
      return faker.random.words()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const system = async (value: string) => {
  switch (value) {
    case 'commonFileExt':
      return faker.system.commonFileExt()
    case 'commonFileName':
      return faker.system.commonFileName()
    case 'commonFileType':
      return faker.system.commonFileType()
    case 'directoryPath':
      return faker.system.directoryPath()
    case 'fileExt':
      return faker.system.fileExt()
    case 'fileName':
      return faker.system.fileName()
    case 'filePath':
      return faker.system.filePath()
    case 'fileType':
      return faker.system.fileType()
    case 'mimeType':
      return faker.system.mimeType()
    case 'semver':
      return faker.system.semver()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const time = async (value: string) => {
  switch (value) {
    case 'recent':
      return faker.time.recent()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const vehicle = async (value: string) => {
  switch (value) {
    case 'bicycle':
      return faker.vehicle.bicycle()
    case 'color':
      return faker.vehicle.color()
    case 'fuel':
      return faker.vehicle.fuel()
    case 'manufacturer':
      return faker.vehicle.manufacturer()
    case 'model':
      return faker.vehicle.model()
    case 'type':
      return faker.vehicle.type()
    case 'vehicle':
      return faker.vehicle.vehicle()
    case 'vin':
      return faker.vehicle.vin()
    case 'vrm':
      return faker.vehicle.vrm()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

const word = async (value: string) => {
  switch (value) {
    case 'adjective':
      return faker.word.adjective()
    case 'adverb':
      return faker.word.adverb()
    case 'conjunction':
      return faker.word.conjunction()
    case 'interjection':
      return faker.word.interjection()
    case 'noun':
      return faker.word.noun()
    case 'preposition':
      return faker.word.preposition()
    case 'verb':
      return faker.word.verb()
    default:
      console.error('The provided value does not exist')
      process.exit(9)
  }
}

module.exports.fakerTypes = async (type: string, value: string) => {
  switch (type) {
    case 'ObjectId':
      const idValue = await id(value)
      return idValue
    case 'newDate':
      const nDate = await newDate(value)
      return nDate
    case 'address':
      const addressValue = await address(value)
      return addressValue
    case 'animals':
      const animalValue = await animals(value)
      return animalValue
    case 'company':
      const companyValue = await company(value)
      return companyValue
    case 'commerce':
      const commerceValue = await commerce(value)
      return commerceValue
    case 'date':
      const dateValue = await date(value)
      return dateValue
    case 'database':
      const databaseValue = await database(value)
      return databaseValue
    case 'datatype':
      const datatypeValue = await datatype(value)
      return datatypeValue
    case 'finance':
      const financeValue = await finance(value)
      return financeValue
    case 'git':
      const gitValue = await git(value)
      return gitValue
    case 'hacker':
      const hackerValue = await hacker(value)
      return hackerValue
    case 'helpers':
      const helpersValue = await helpers(value)
      return helpersValue
    case 'image':
      const imageValue = await image(value)
      return imageValue
    case 'internet':
      const internetValue = await internet(value)
      return internetValue
    case 'lorem':
      const loremValue = await lorem(value)
      return loremValue
    case 'music':
      const musicValue = await music(value)
      return musicValue
    case 'name':
      const nameValue = await name(value)
      return nameValue
    case 'phone':
      const phoneValue = await phone(value)
      return phoneValue
    case 'random':
      const randomValue = await random(value)
      return randomValue
    case 'system':
      const systemValue = await system(value)
      return systemValue
    case 'time':
      const timeValue = await time(value)
      return timeValue
    case 'vehicle':
      const vehicleValue = await vehicle(value)
      return vehicleValue
    case 'word':
      const wordValue = await word(value)
      return wordValue
    default:
      console.error(`${type} is not a valid faker type.`)
      process.exit(9)
  }
}