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

  let AdminUser = "INSERT INTO user (id, email, password, lastname, firstname, Admin) VALUES ('3004', 'Admin@Admin.com', '$2b$10$xkCKeVnvCQHcY1al8v2D8uvhR6foZrcPzW3O4dIgRa4Iskkwl6RNG', 'Admin', 'Admin', '1' )";

  db.execute( AdminUser, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
  

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

  