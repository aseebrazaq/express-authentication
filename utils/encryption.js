const bcrypt = require('bcrypt')
const saltRounds = 10

const hashPassword = async (userInputPassword) => {
    const hashed = await bcrypt.hash(userInputPassword, saltRounds);
    return hashed;
}

const comparePassword = (userInputPassword, dbHashedPassword) => {

}

module.exports = {
    hashPassword,
    comparePassword
}