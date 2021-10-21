const { User } = require(`../models`)
const { comparePassword } = require(`../helpers/bcrypt`)
const { createToken } =  require(`../helpers/jwt`)

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const generator = require(`generate-password`)

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

    static loginGoogle = async (req, res, next) => {
        try {
            const { token } = req.body
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID, 
            })

            const payload = ticket.getPayload()
            const emailFromGoogle = payload.email
            const name = payload.name
            const password = generator.generate({
                length: 10,
                numbers: true
            })
            
            const [ user, isCreated ] = await User.findOrCreate({
                where: {
                    email: emailFromGoogle
                },
                defaults: {
                    name,
                    password
                }
            })
            
            console.log(user)
            const userLogin = {
                id: user.id,
                name: user.name,
                email: user.email
            }

            const accessToken = createToken(userLogin)
            res.status(200).json({ access_token: accessToken })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UsersController