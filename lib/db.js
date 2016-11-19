const pgp = require('pg-promise')();

const databaseConnection = process.env.DATABASE_URL;
const db = pgp(databaseConnection);

module.exports = db;
