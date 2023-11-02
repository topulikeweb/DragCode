const express = require('express');
const router = express.Router();
const routerHandle = require('../router-handle/index');

router.post('/login', routerHandle.login);
router.post('/register', routerHandle.register);
module.exports = router;
