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
        database: process.env.DB_NAME,
        ssl: false
    },
    pool: {
        min: 1,
        max: 100,
        propagateCreateError: false
    },
    useNullAsDefault: true
});

knex.raw("SELECT 1").then(() => {

    console.log("PostgreSQL connected");
})
    .catch((e) => {
        console.log("PostgreSQL not connected");
        console.error(e.message);
    });


module.exports = knex;