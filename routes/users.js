const UsersController = require("../controllers/usersController")

const router = require(`express`).Router()

router.post(`/regis`, UsersController.register)
router.post(`/login`, UsersController.login)

module.exports = router