const { Todo, User } = require('../models')

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
}

module.exports = TodosController