const Post = require("../models/post");
const conn = require("../config/db");
require('dotenv').config();
const fs = require('fs'); // Avoir accès à des opérations liés aux systèmes de fichiers




exports.createPost = (req, res, next) => {
    let image = "";

    if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        user_id: req.body.user_id,
        title: title,
        content: content,
        image: image
    });
    if (!title && !content && !image) {
        return res.status(400).json({ message: "Le titre ne peux pas être vide" });
    } else {

        conn.query(`INSERT INTO post SET ?`, post, (error, result) => {

            if (error) {
                return res.status(400).json({ error: error });
            }
            return res.status(201).json({ message: "Post crée!" });
        });
    }
};




// Modifier un post
exports.modifyPost = (req, res, next) => {
    let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

    if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    conn.query(`SELECT * FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
        if (error) {
            return res.status(500).json({ error: "mysql" });
        } else {
            if (rows[0].image) {
                const filename = rows[0].image.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    conn.query(`UPDATE post SET content = ?, title = ?, image= ?  WHERE id = ?`, [req.body.content, req.body.title, image, req.params.id], (error, result) => {
                        if (error) {
                            return res.status(400).json({ error: "Le post n'a pas pu être modifié" });
                        }
                        return res.status(200).json(result);
                    });
                });
            } else {
                conn.query(`UPDATE post SET content = ?, title = ?, WHERE id = ?`, [req.body.content, req.body.title, image, req.params.id], (error, result) => {
                    if (error) {
                        return res.status(400).json({ error: "Le post n'a pas pu être modifié" });
                    }
                    return res.status(200).json(result);
                });

            }



        }
    });
};





exports.deletePost = (req, res, next) => {
    conn.query(`SELECT * FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
        if (error) {
            return res.status(500).json({ error: "mysql" });
        } else {
            if (rows[0].image) {
                const filename = rows[0].image.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {

                    conn.query(`DELETE FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
                        if (error) {
                            return res.status(500).json({ error: "impossible de supprimer" });
                        } else {

                            return res.status(200).json({ message: "Message supprimé !" });
                        };
                    });
                });
            } else {
                conn.query(`DELETE FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
                    if (error) {
                        return res.status(500).json({ error: "impossible de supprimer" });
                    } else {

                        return res.status(200).json({ message: "Message supprimé !" });
                    };
                });
            }

        }
    });

};



//tout les posts
exports.getAllPost = (req, res, next) => {

    conn.query('SELECT post.id, content, image, title, user_id, dateCreate, isAdmin, username  FROM post INNER JOIN user ON user.id = post.user_id ORDER BY dateCreate DESC', (error, result) => {
        if (error) {
            return res.status(400).json({ error: "impossible d'afficher tous les post" });
        }
        return res.status(200).json(result);
    });
};
// un post
exports.getOnePost = (req, res, next) => {


    conn.query('SELECT post.id, content, image, title, user_id, dateCreate, isAdmin, username FROM post INNER JOIN user ON user.id = post.user_id WHERE post.id=? ', req.params.id, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "impossible d'afficher un  post" });
        }
        return res.status(200).json(result);
    });
};