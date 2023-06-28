const router = require('express').Router();
const { getUser } = require('../controller/user.control');
const verifyJWT = require('../middleware/jwt');

router.get('/', verifyJWT, getUser);

module.exports = router