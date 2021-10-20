const TodosController = require("../controllers/todosController")
const authentication = require(`../middlewares/authentication`)

const router = require(`express`).Router()

router.use(authentication)
router.get(`/`, TodosController.fetchTodo)
router.post(`/add`, TodosController.addTodo)
router.get(`/notes`, TodosController.fetchNotes)
router.post(`/notes/add`, TodosController.addNotes)

router.patch(`/status/:id`, TodosController.editStatus)
router.delete('/:id', TodosController.delete)

module.exports = router