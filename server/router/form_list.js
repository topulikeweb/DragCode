const express = require('express');
const router = express.Router();
const routerHandle = require('../router-handle/form_list');

router.get('/historyLists', routerHandle.history_list);
module.exports = router;
