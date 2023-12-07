const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');

router.get('/', ItemController.getAllItems);

router.post('/', ItemController.createItem);

router.get('/:id', ItemController.getItemById);

router.put('/:id', ItemController.updateItem);

router.delete('/:id', ItemController.deleteItem);

module.exports = router;
