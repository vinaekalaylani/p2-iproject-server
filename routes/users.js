const UsersController = require("../controllers/usersController")

const router = require(`express`).Router()

router.post(`/regis`, UsersController.register)

module.exports = router