const mysql = require('mysql2');

const User = function (user) {
    this.id = user.id;
    this.lastname = user.lastname;
    this.firstname = user.firstname;
    this.email = user.email;
    this.password = user.password;
    this.Admin = user.Admin;
};

module.exports = User;