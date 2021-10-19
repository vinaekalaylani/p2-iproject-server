const router = require(`express`).Router()
const users = require(`./users`)
const errorHandler = require(`../middlewares/errorHandler`)

router.get('/', (req, res) => res.send(`HALOOOO`))
router.use(`/users`, users)

router.use(errorHandler)
module.exports = router