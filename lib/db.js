"use strict";
let pgp                = require('pg-promise')();
let databaseConnection = process.env.DATABASE_URL;
let db                 = pgp(databaseConnection);

module.exports = db;
