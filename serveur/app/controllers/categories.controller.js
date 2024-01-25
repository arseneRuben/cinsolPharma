const db = require("../models");
const Category = db.categories;
const Op = db.Sequelize.Op;

// Create and Save a new Category.
exports.create = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await Category.create({ name, description });
        res.status(201).json(category); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve all Categories from the database.
exports.findAll = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Find a single Category with an id.
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findByPk(id);
        
        if (!category) {
            res.status(404).json({ error: "Category not found" }); 
        } else {
            res.status(200).json(category); 
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a category by the id in the request.
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;
        const result = await Category.update({ name, description }, { where: { id } });

        if (result[0] === 0) {
            res.status(404).json({ error: "Category not found" }); 
        } else {
            res.status(200).json({ message: "Category updated successfully" }); 
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Category with the specified id in the request.
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Category.destroy({ where: { id } });

        if (result === 0) {
            res.status(404).json({ error: "Category not found" }); 
        } else {
            res.status(200).json({ message: "Category deleted successfully" }); 
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete all Categories from the database.
exports.deleteAll = async (req, res) => {
    try {
        const result = await Category.destroy({ where: {} });
        res.status(200).json({ message: "All categories deleted successfully" }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
