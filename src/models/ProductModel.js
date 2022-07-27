const { Sequelize } = require('sequelize');
const sequelize = require('../configs/database').sequelize;

var Product = sequelize.define('Product', {
    product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    category_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    shopee: Sequelize.STRING,
    brand: Sequelize.STRING,
    color: Sequelize.STRING,
    size: Sequelize.STRING,
    image: Sequelize.STRING,
    images: Sequelize.STRING,
    status: Sequelize.INTEGER,
    price: Sequelize.FLOAT
})

module.exports = Product;