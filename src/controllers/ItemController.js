const { Item } = require('../db');

const ItemController = {
  getAllItems: async (req, res) => {
    try {
      const items = await Item.findAll();
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Create a new item
  createItem: async (req, res) => {
    try {
      const { name, unit, price } = req.body;
      const newItem = await Item.create({ name, unit, price });
      res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get item by ID
  getItemById: async (req, res) => {
    try {
      const itemId = req.params.id;
      const item = await Item.findByPk(itemId);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update item by ID
  updateItem: async (req, res) => {
    try {
      const itemId = req.params.id;
      const { name, unit, price } = req.body;
      const item = await Item.findByPk(itemId);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      await item.update({ name, unit, price });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Delete item by ID
  deleteItem: async (req, res) => {
    try {
      const itemId = req.params.id;
      const item = await Item.findByPk(itemId);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      await item.destroy();
      res.json({ message: 'Item deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = ItemController;
