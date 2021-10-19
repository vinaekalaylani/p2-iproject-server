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
            const todos = await Todo.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'name', 'email']
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                order: [
                    ['updatedAt', 'DESC']
                ]
            })
            res.status(200).json(todos)
        } catch (error) {
            next(error)
        }
    }

    static async editStatus(req, res, next) {
        try {
            const { status } = req.body
            const { id } = req.params

            const todo = await Todo.findByPk(id)

            if (todo) {
                const newTodos = await Todo.update(
                    { 
                        status
                    },
                    {
                        where: { id }
                    }
                )
                res.status(200).json({ message: `Success edit status`})
            } else {
                throw ({ name: `Todo Not Found`})
            }
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        const { id } = req.params
        try {
            const todo = await Todo.destroy({
                where: { id }
            })
            
            res.status(200).json({ message : `Todo success to delete`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TodosController