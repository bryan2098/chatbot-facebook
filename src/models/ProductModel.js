const knex = require('../utils/knex');

class Product {
    constructor() { };

    static getAllProductType(type) {
        let sql = knex('Product').select('*').orderBy('created_at', 'desc').limit(9);

        if (type) {
            sql.andWhere('category_id', type);
        }

        console.log('sql', sql);

        return sql;
    }
}

module.exports = Product;