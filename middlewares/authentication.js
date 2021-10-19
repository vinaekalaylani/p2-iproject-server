const { User } = require(`../models`)
const { verifyToken } = require(`../helpers/jwt`)

const authentication = async (req, res, next) => {
    try {
        const { access_token: token } = req.headers

        if (!token) {
            throw { name : `Unauthenticated`}
        }

        
        const user = verifyToken(token)
        
        const userLogin = await User.findOne({
            where: { 
                id: user.id,
                email: user.email
            }
        })

        if (!userLogin) {
            throw { name: `AuthenticationError`}
        }

        req.user = {
            id: userLogin.id,
            email: userLogin.email,
            role: userLogin.role
        }

        next()

    } catch (error) {
        next(error)
    }
} 

module.exports = authentication