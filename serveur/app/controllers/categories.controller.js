const db = requiere("../models");
const Category = db.categories;
const Op = db.Sequelize.Op;

// Create and Save a new Category.
exports.create = (req, res) => {
    const { name, description} = req.body;
    Category.create({name, description})
        .then((category) => {
            res.json(category);
        })
        .catch(error => {res.status(500).json({ error: error.message});
        });
};

// Retrieve all Categories fron the database.
exports.findAll = (req, res) => {
    Category.findAll()
        .then(categories => {
            res.json(categories);
        })
        .catch(error =>{
            res.status(500).json({error: error.message});
        });
}; 

// Find a single Category with an id 
exports.findOne = (req, res) => {
    const id = res.params.id;
    Category.finfByPk(id)
        .then(category => {
            res.json(category);
        })
        .catch(error => {
            res.status(500).json({error: error.message});
        });
};

// Update a category by the id in the request 
exports.update = (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    Category.update ({ name, description }, {where: { id } })
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(500).json({error: error.message});
        });
};

// Delete a Category with the specified id in the request 
exports.delete = (req, res) => {
    const id = req.params.id;
    Category.destroy( { where: { id } })
        .then(result => {
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        })
};

// Delete all Categories from the database. 
exports.deleteAll = (req, res) => {
    Category.destroy({ where: {} })
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        })
};