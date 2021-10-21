const { Todo, User, Note } = require('../models')
const sendEmail = require('../helpers/nodemailer')
const { Op } = require("sequelize");

class TodosController {
    static async addTodo (req, res, next) {
        try {
            const { title, content, tag } = req.body
            const payload = req.user // to get User Login

            const todos = await Todo.create(
                { 
                    title,
                    tag,
                    content,
                    UserId: req.user.id
                })
            sendEmail(payload, todos.content, `[ TODOIN - ${todos.tag} #${todos.id}] ${title}`)
            res.status(201).json(todos)
        } catch (error) {
            next(error)
        }
    }

    static async fetchTodo(req, res, next) {
        try {
            const { title, status } = req.query

            let condition = {
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
                ],
                where: {}
            }

            if (title) condition.where.title = {[Op.iLike]: `%${title}%`}
            if (status) condition.where.status = status

            const todos = await Todo.findAll(condition)
            res.status(200).json(todos)
        } catch (error) {
            next(error)
        }
    }

    static async fetchNotes(req, res, next) {
        try {
            const notes = await Note.findAll({
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
            res.status(200).json(notes)
        } catch (error) {
            next(error)
        }
    }

    static async editStatus(req, res, next) {
        try {
            const { status } = req.body
            const { id } = req.params
            const payload = req.user // to get User Login 
            
            const todo = await Todo.findByPk(id, { include: { model: User } })

            if (todo) {
                const newTodos = await Todo.update(
                    { 
                        status
                    },
                    {
                        where: { id }
                    }
                )
                sendEmail(todo.User, `Status just updated to ${status} by ${payload.name}`, `[ TODOIN - ${todo.tag} #${todo.id}] ${todo.title}`)
                res.status(200).json({ message: `Success edit status`})
            } else {
                throw ({ name: `Todo Not Found`})
            }
        } catch (error) {
            next(error)
        }
    }

    static async edit(req, res, next) {
        try {
            const { id } = req.params
            const { title, content, tag } = req.body
            const payload = req.user // to get User Login

            const todos = await Todo.findByPk(id, { include: { model: User } })

            if (!todos) {
                throw ({ name: `Todo Not Found`})
            }
            
            const todo = await Todo.update(
                { title, content, tag, status: todos.status },
                {
                    where: { id },
                    returning: true
                }
            )
            sendEmail(todos.User, `Updated Todo by ${payload.name}`, `[ TODOIN - ${tag} #${id}] ${title}`)
            res.status(200).json(todo[1])
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params
            const payload = req.user // to get User Login

            const todos = await Todo.findByPk(id, { include: { model: User } })
            sendEmail(todos.User, `Success delete Todo #${todos.id} by ${payload.name}`, `[ TODOIN - ${todos.tag} #${todos.id}] ${todos.title}`)
            
            const todo = await Todo.destroy({
                where: { id }
            })
            
            res.status(200).json({ message : `Todo success to delete`})
        } catch (error) {
            next(error)
        }
    }

    // NOTES
    static async addNotes (req, res, next) {
        try {
            const { content } = req.body
            const payload = req.user // to get User Login

            const todos = await Note.create(
                {   
                    content,
                    UserId: req.user.id
                })
            sendEmail(payload, todos.content, `[ TODOIN - NOTES #${todos.id}]`)
            res.status(201).json(todos)
        } catch (error) {
            next(error)
        }
    }

    // USER
    static async getUser (req, res, next) {
        try {
            const { id } = req.user
            const user = await User.findByPk(id)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TodosController