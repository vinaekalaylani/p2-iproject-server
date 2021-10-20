const router = require(`express`).Router()
const users = require(`./users`)
const todos = require(`./todos`)
const errorHandler = require(`../middlewares/errorHandler`)

router.get('/haha', (req, res) => res.send(`HALOOOO`))
router.use(`/users`, users)
router.use(`/todos`, todos)

router.use(errorHandler)
module.exports = router