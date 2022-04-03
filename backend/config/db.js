const mysql = require('mysql2');
const dotenv = require("dotenv").config();
// Create the connection 
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  database: 'groupomania',
  password: process.env.DB_PASSWORD
});
  
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

let user = `create table if not exists user(
  id int primary key auto_increment,
  email varchar(50) not null unique,
  password VARCHAR(255) not null,
  lastname VARCHAR(45) not null, 
  firstname VARCHAR(45) not null,
  Admin TINYINT(4) not null
)`;

db.execute(user, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});
//ON DELETE CASCADE\
//CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)\

let post = `create table if not exists post(
  id int primary key auto_increment not null,
  user_id int not null,
  title VARCHAR(50) not null,
  content TEXT not null,
  image VARCHAR(120)
)`;

db.execute( post, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});

// FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),\
//FOREIGN KEY (`post_id`) REFERENCES `post`(`id`)\

let commentTable = `create table if not exists comment(
  id int primary key auto_increment not null,
  content TEXT not null,
  post_id int not null,
  user_id int not null
)`;

db.execute( commentTable, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});

module.exports = db;

  