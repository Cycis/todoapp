const router = require('express').Router();
const { createTodo, getTodos, updateTodo, deleteTodo, getTodo } = require('../controller/todo.control')
const verifyJWT = require('../middleware/jwt')

router.post('/', createTodo);
router.get('/', getTodos)
router.get('/:id', getTodo)
router.patch('/', updateTodo).delete('/:id', deleteTodo)

module.exports = router;