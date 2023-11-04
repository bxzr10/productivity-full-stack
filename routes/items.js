const express = require('express');
const router = express.Router();

const { getItemsAll, getItemsByMonth, updateItem, newItem, deleteItem } = require('../data/controller');

router.get('/', getItemsAll);
// router.get('/:id', getProjectById);
router.get('/:monthName', getItemsByMonth);
router.put('/update', updateItem);
router.post('/create', newItem);
router.delete('/delete/:id', deleteItem);

module.exports = router;
