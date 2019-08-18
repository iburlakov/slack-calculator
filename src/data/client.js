const initOptions = {/* initialization options */};
const pgp = require('pg-promise')(initOptions);


const connection = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};

module.exports = pgp(connection);