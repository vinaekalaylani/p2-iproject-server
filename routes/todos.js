const TodosController = require("../controllers/todosController")
const authentication = require(`../middlewares/authentication`)

const router = require(`express`).Router()

router.use(authentication)
router.post(`/add`, TodosController.addTodo)

module.exports = router