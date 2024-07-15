const bcrypt = require('bcrypt')
const saltRounds = 10

const hashPassword = async (userInputPassword) => {
    return await bcrypt.hash(userInputPassword, saltRounds);
}

const comparePassword = (userInputPassword, dbHashedPassword) => {

}

module.exports = {
    hashPassword,
    comparePassword
}