"use strict";

const Sequelize = require('sequelize');

const connection = new Sequelize('user_profile', 'Admin', 'Admin', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
});

connection.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = connection;

