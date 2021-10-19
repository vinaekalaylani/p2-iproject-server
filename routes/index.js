const router = require(`express`).Router()
const users = require(`./users`)

router.get('/', (req, res) => res.send(`HALOOOO`))
router.use(`/users`, users)

module.exports = router