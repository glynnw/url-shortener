"use strict";
let pgp                = require('pg-promise')();
let databaseConnection = process.env.DATABASE_URL + '/urls';
console.log(databaseConnection);
let db                 = pgp(databaseConnection);

module.exports = db;
