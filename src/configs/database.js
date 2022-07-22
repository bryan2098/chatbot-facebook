const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://wwgprdlmaisekl:7dc59340899f3c2a7b393851821e81dd5a57b6ada1ec8018a888b2805279023a@ec2-3-217-14-181.compute-1.amazonaws.com:5432/d3ffoorkgietmi') // Example for postgres

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connect;