const sessionData = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: ''
}

// locals for the res.render() passing data to views
const locals = (payload, message = '') => {
    return {
        message: message,
        data: {
            ...sessionData,
            ...payload
        }
    }
}

module.exports = {
    locals
}