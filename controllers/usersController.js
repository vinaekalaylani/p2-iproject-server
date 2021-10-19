const { User } = require(`../models`)
const { comparePassword } = require(`../helpers/bcrypt`)
const { createToken } =  require(`../helpers/jwt`)

class UsersController {
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body
            const user = await User.create(
                { 
                    name, 
                    email, 
                    password
                })
    
            res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async login (req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })

            if ( !user ) {
                throw { name: `Unauthenticated` }
            } 
            
            if ( !comparePassword(password, user.password) ) {
                throw { name: `Unauthenticated` }
            }

            const userLogin = {
                id: user.id,
                email: user.email
            }

            const accessToken = createToken(userLogin)
            res.status(200).json( { accessToken } )

        } catch (error) {
            next(error)
        }
    }
}

module.exports = UsersController