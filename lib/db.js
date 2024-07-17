const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
})

const testConnection = async function () {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        process.exit()
    }
}

module.exports = {
    Sequelize,
    sequelize,
    testConnection,
}
