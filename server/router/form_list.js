const express = require('express');
const router = express.Router();
const routerHandle = require('../router-handle/form_list');

router.get('/historyLists', routerHandle.history_list);
router.post('/updateHistory_lists', routerHandle.updateHistory_list);
module.exports = router;
