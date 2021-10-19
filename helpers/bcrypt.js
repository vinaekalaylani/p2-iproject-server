const bcrypt = require(`bcrypt`)

const hashingPassword = (password) => {
    return bcrypt.hashSync(password, 8)
}

const comparePassword = (password, hashingPassword) => {
    return bcrypt.compareSync(password, hashingPassword)
}

module.exports = {
    hashingPassword,
    comparePassword
}