const router = require('express').Router();
const { register, signin, logout } = require('../controller/auth.control');


router.post('/register', register);
router.post('/login', signin)
router.post('/logout', logout)

module.exports = router;