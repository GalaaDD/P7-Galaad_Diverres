const User = require("../models/user");
const db = require("../config/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


//function to crypt the password and send user's informations to groupomania's data base to save it
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                id: req.param.id,
                email: req.body.email,
                password: hash,
                lastname: req.body.lastname,
                firstname:req.body.firstname,
                Admin: 0,
            });
            db.query('INSERT INTO user SET ?', user, (err, result, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json("erreur");
                }else{
                    return res.status(201).json({ message: 'Le compte utilisateur a bien été crée !' }, );
                }
            });
        })
        .catch(error => res.status(500).json({ error }));
};

//fonction that allow the user to connect to the session through the use of a comparaison of hashes and token.
exports.login = async(req, res, next) => {
    console.log(req.body.email);
    if (req.body.email && req.body.password) {
        db.query('SELECT * FROM user WHERE email= ?', req.body.email, (error, results, fields) => {
            if (results.length > 0) {
                bcrypt.compare(req.body.password, results[0].password)
                    .then((valid) => {
                        if (!valid) {
                            res.status(401).json({ message: 'Le mot de passe est incorrect' });
                        } else {
                            console.log(req.body.email, "connecté");
                            
                            res.status(200).json({
                                userId: results[0].id,
                                email: results[0].email,
                                lastname: results[0].lastname,
                                firstname: results[0].firstname,
                                Admin: results[0].Admin,
                                token: jwt.sign(
                                    { userId: results[0].id },
                                    process.env.SECRET_TOKEN_KEY,
                                    { expiresIn: "24h" }
                                ),
                            });

                        }
                    });
            } else {
                res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' });
            }
        });
    } else {
        res.status(500).json({ message: "Un email et un mot de passe sont necessaires pour se connecter" });
    }
};

// function to select one user
exports.getOneUser = (req, res, next) => {
    conn.query('SELECT * FROM user WHERE id =?', req.params.id, (error, result) => {
        if (error) {
            return res
                .status(400)
                .json({ error: "Impossible d'afficher cet Utilisateur" });
        }
        return res.status(200).json(result);
    });
};

// function to update users' informations
exports.updateUser = (req, res, next) => {
    const email = req.body.email;
    const userId = req.params.userId;
    let password = req.body.password;
    console.log(req.body.email);
    console.log(req.body.password);
    if (!email || !password) {
        return res.status(400).json({ message: "Un email et un mot de passe sont necessaires" });
    } else {
        bcrypt.hash(password, 10)
            .then((hash) => {

                password = hash;
                db.query(
                    `UPDATE user SET email='${email}', password='${password}', Admin=${0}  WHERE id=?`, userId, (error, results, fields) => {
                        if (error) {
                            return res.status(400).json(error);
                        }
                        return res.status(200).json({ message: 'Vos informations ont bien été mise à jour !' });
                    }

                );

            })
            .catch(error => res.status(500).json({ error }));
    }
};

// function to delete user account
exports.deleteUser = (req, res, next) => {
    let user_id = req.params.userId;
    console.log(user_id);
    db.query(`DELETE FROM user WHERE id = ?`, user_id, (error, result) => {
        if (error) return res.status(400).json({ error: "Le compte utilisateur n'a pas pu etre supprimé" });
        return res.status(200).json(result);
    });
};