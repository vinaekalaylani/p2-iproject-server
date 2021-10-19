const { User } = require(`../models`)

class UsersController {
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body
            const user = await User.create(
                { 
                    name, 
                    email, 
                    password, 
                    role: `Student`
                })
    
            res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UsersController