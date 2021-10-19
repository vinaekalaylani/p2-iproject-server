const { Todo, User, Notes } = require('../models')

class TodosController {
    static async addTodo (req, res, next) {
        try {
            const { title, content } = req.body

            const todos = await Todo.create(
                { 
                    title, 
                    content,
                    UserId: req.user.id
                })
            res.status(201).json(todos)
        } catch (error) {
            next(error)
        }
    }

    static async fetchTodo(req, res, next) {
        try {
            const posts = await Todo.findAll({
                include: [{
                    model: User,
                    attributes: ['id', 'name', 'email']
                }],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                order: [
                    ['updatedAt', 'DESC']
                ]
            })
            res.status(200).json(posts)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TodosController