require('dotenv').config();

// const knex = require('knex')({
//     client: 'pg',
//     connection: {
//         host: 'localhost',
//         port: 5432,
//         user: 'postgres',
//         password: 'postgres',
//         database: 'ChatBotMollie'
//     },
//     useNullAsDefault: true
// });

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    useNullAsDefault: true
});


module.exports = knex;