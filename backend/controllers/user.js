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
                userId: req.param.id,
                email: req.body.email,
                password: hash,
                lastname: req.body.lastname,
                firstname:req.body.firstname,
                isAdmin: 0,
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
    let status = '';
    if (req.body.email && req.body.password) {
        db.query('SELECT * FROM user WHERE email= ?', req.body.email, (error, results, fields) => {
            if (results.length > 0) {
                bcrypt.compare(req.body.password, results[0].password)
                    .then((valid) => {
                        if (!valid) {
                            res.status(401).json({ message: 'Le mot de passe est incorrect' });
                        } else {
                            console.log(req.body.email, "connecté");
                            
                            if (results[0].isAdmin === 1) {
                                status = 'administrateur';
                            } else {
                                status = 'membre';
                            }
                            res.status(200).json({
                                userId: results[0].id,
                                email: results[0].email,
                                lastname: results[0].lastname,
                                firstname: results[0].firstname,
                                isAdmin: results[0].isAdmin,
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

//function to display all of the users
exports.getAllUsers = (req, res, next) => {
    db.query('SELECT id, email, firstname FROM user ', (error, result) => {
        if (error) {
            return res
                .status(400)
                .json({ error: "Les utilisateurs ne peuvent pas etre affichés " });
        }
        return res.status(200).json(result);
    });
};;

// function to display one of the users
exports.getOneUser = (req, res, next) => {
    db.query('SELECT * FROM user WHERE id =?', req.params.id, (error, result) => {
        if (error) {
            return res
                .status(400)
                .json({ error: "Utilisateur introuvable ou indisponible" });
        }
        return res.status(200).json(result);
    });
};

// function to update users' informations
exports.updateUser = (req, res, next) => {
    const email = req.body.email;
    const id = req.params.id;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({ message: "Un email et un mot de passe sont necessaires" });
    } else {
        bcrypt.hash(password, 10)
            .then((hash) => {

                password = hash;
                db.query(
                    `UPDATE user SET email='${email}', password='${password}', isAdmin=${0}  WHERE id=?`, id, (error, results, fields) => {
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
    let user_id = req.params.id;
    db.query(`DELETE FROM user WHERE id = ?`, user_id, (error, result) => {
        if (error) return res.status(400).json({ error: "Le compte utilisateur n'a pas pu etre supprimé" });
        return res.status(200).json(result);
    });
};