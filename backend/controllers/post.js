const Post = require("../models/post");
const db = require("../config/db");
require('dotenv').config();
const fs = require('fs'); 

//function to create a post and send it to groupomania Data Base
exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.userId;
    
    console.log(userId);
    let image = "";

    if (req.file) {
        image	= `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
   
    const post = new Post({
        user_id: userId,
        title: title,
        content: content,
        image: image,
    });
    console.log(post);
    if (!title && !content) {
        return res.status(400).json({ message: "Veuillez renseigner le titre, le contenu " });
    } else {

        db.query(`INSERT INTO post SET ?`, post, (error, result) => {

            if (error) {
                return res.status(400).json({ error: error });
            }
            return res.status(201).json({ message: "La publication a bien été crée!" });
        });
    }
};

//function to update a post
exports.updatePost = (req, res, next) => {
  let image = null;

  if (req.file) {
    image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }

  console.log(req.params);
  db.query(
    `SELECT * FROM post WHERE id = ?`,
    [req.params.postId],
    (error, rows, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "mysql" });
      } else {
        if (rows[0].image) {
          const filename = rows[0].image.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            db.query(
              `UPDATE post SET content = ?, title = ?, image= ?  WHERE id = ?`,
              [req.body.content, req.body.title, image, req.params.postId],
              (error, result) => {
                if (error) {
                  return res
                    .status(400)
                    .json({ error: "Le post n'a pas pu être modifié" });
                }
                return res.status(200).json(result);
              }
            );
          });
        } else {
          db.query(
            `UPDATE post SET content = ?, title = ?, image= ?  WHERE id = ?`,
            [req.body.content, req.body.title, image, req.params.postId],
            (error, result) => {
              if (error) {
                return res
                  .status(400)
                  .json({ error: "Le post n'a pas pu être modifié" });
              }
              return res.status(200).json(result);
            }
          );
        }
      }
    }
  );
};

//function to delete a post from groupomania data base
exports.deletePost = (req, res, next) => {
    db.query(`SELECT * FROM post WHERE id=?`, req.params.postId, (error, rows, fields) => {
        if (error) {
            return res.status(500).json({ error: "mysql" });
        } else {
            db.query(`DELETE FROM post WHERE id=?`, req.params.postId, (error, rows, fields) => {
                if (error) {
                    return res.status(500).json({ error: "impossible de supprimer" });
                } else {

                    return res.status(200).json({ message: "Message supprimé !" });
                };
            });
        }
    });
};

exports.getAllPosts = (req, res, next) => {
    
    db.query('SELECT post.id, user_id, title, content, image, firstname, lastname FROM post INNER JOIN user ON user.id = post.user_id ORDER BY post.id DESC', (error, result) => {
        if (error) {
            return res.status(400).json({ error: "L'affichage de l'ensemble des publications semble etre indisponible pour le moment" });
        }
        return res.status(200).json(result);
    });
};