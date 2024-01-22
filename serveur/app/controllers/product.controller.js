const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = async (req, res) => {
  try {
    const { name, code, unit_price, threshold_qty } = req.body;
    const product = await Product.create({ name, code, unit_price, threshold_qty });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all Products from the database.
exports.findAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Find a single Product with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Product by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, code, unit_price, threshold_qty } = req.body;
    const result = await Product.update({ name, code, unit_price, threshold_qty }, { where: { id } });

    if (result[0] === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json({ message: "Product updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Product with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.destroy({ where: { id } });

    if (result === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json({ message: "Product deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete all Products from the database.
exports.deleteAll = async (req, res) => {
  try {
    const result = await Product.destroy({ where: {} });
    res.status(200).json({ message: "All products deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Find all published Products
exports.findAllPublished = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { published: true } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
