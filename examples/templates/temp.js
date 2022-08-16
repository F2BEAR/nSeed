const { Types } = require('../../lib/main.min')
const type = new Types()

module.exports = () => {
	return {
		status: type.oneOf(['active', 'inactive', 'banned', 'bamboozed']),
		firstName: type.faker.name.firstName(),
		lastName: type.faker.name.lastName(),
		gender: type.faker.name.gender(),
		job: type.faker.name.jobTitle()
	}
}
