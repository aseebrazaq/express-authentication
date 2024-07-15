const bcrypt = require('bcrypt')
const saltRounds = 10

const hashPassword = async (userInputPassword) => {
    return await bcrypt.hash(userInputPassword, saltRounds)
}

const comparePassword = async (userInputPassword, dbHashedPassword) => {
    return await bcrypt.compare(userInputPassword, dbHashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}