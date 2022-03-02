const User = require("../models/user");
const db = require("../config/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypt = require('crypto-js');
require('dotenv').config();




//fonction qui va crypté le mot de passe qui va le prendre et creer un nouveau user 
//avec ce mot de passe et l'email et va l'enregistrer dans la base de donnée
exports.signup = (req, res, next) => {
    const cryptoEmail = crypt.MD5(req.body.email).toString();
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: cryptoEmail,
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
                    return res.status(201).json({ message: 'Votre compte a bien été crée !' }, );
                }
            });
        })
        .catch(error => res.status(500).json({ error }));
};


//fonction qui permet au utilisateur existant de se connecter
exports.login = async(req, res, next) => {
    const cryptoEmail = crypt.MD5(req.body.email).toString();
    //let status = '';
    //console.table([req.body.email, req.body.password]);
    if (cryptoEmail && req.body.password) {
        db.query('SELECT * FROM user WHERE email= ?', cryptoEmail, (error, results, fields) => {
            if (results.length > 0) {
                //bcrypt va comparé le mot de passe que l'utilisateur va entrer avec ce qui est déja enregistrer avec compare
                bcrypt.compare(req.body.password, results[0].password)
                    .then((valid) => { //valid est un boolean qui est d'abord sur true 
                        //si c'est false il y a error
                        if (!valid) {
                            res.status(401).json({ message: 'Mot de passe incorrect' });
                        } else {
                            //confirmation User connecté
                            console.log(cryptoEmail, "s'est connecté");
                            //on décris le niveau d'acces du membre
                            if (results[0].isAdmin === 1) {
                                status = 'administrateur';
                            } else {
                                status = 'membre';
                            }
                            res.status(200).json({
                                userId: results[0].id,
                                email: results[0].email,
                                username: results[0].username,
                                isAdmin: results[0].isAdmin,
                                token: jwt.sign({ userId: results[0].id, username: results[0].username, isAdmin: results[0].isAdmin }, process.env.DB_TOKEN, { expiresIn: '24h' })
                            });

                        }
                    });
            } else {
                res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' });
            }
        });
    } else {
        res.status(500).json({ message: "Entrez votre email et votre mot de passe" });
    }
};



exports.deleteUser = (req, res, next) => {
    let user_id = req.params.id;
    db.query(`DELETE FROM user WHERE id = ?`, user_id, (error, result) => {
        if (error) return res.status(400).json({ error: "Le user n'a pas pu être supprimé" });
        return res.status(200).json(result);
    });
};


//fonction qui permet d'afficher tous les utilisateurs
exports.getAllUser = (req, res, next) => {
    db.query('SELECT id, username, email FROM user ', (error, result) => {
        if (error) {
            return res
                .status(400)
                .json({ error: "impossible d'afficher les listes des membres" });
        }
        return res.status(200).json(result);
    });
};;

// fonction qui permet d'afficher un utilisateur
exports.getOneUser = (req, res, next) => {
    db.query('SELECT * FROM user WHERE id =?', req.params.id, (error, result) => {
        if (error) {
            return res
                .status(400)
                .json({ error: "Impossible d'afficher cet Utilisateur" });
        }
        return res.status(200).json(result);
    });
};

// fonction qui permet de modifier les informations de l'utilisateur
exports.modifyUser = (req, res, next) => {
    const cryptoEmail = crypt.MD5(req.body.email).toString();
    const email = cryptoEmail;
    const id = req.params.id;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({ message: "les champs des formulaires ne doivent pas être vide" });
    } else {
        bcrypt.hash(password, 10)
            .then((hash) => {

                password = hash;
                db.query(
                    `UPDATE user SET email='${email}', password='${password}', isAdmin=${0}  WHERE id=?`, id, (error, results, fields) => {
                        if (error) {
                            return res.status(400).json(error);
                        }
                        return res.status(200).json({ message: 'Vos information ont bien été modifié !' });
                    }

                );

            })
            .catch(error => res.status(500).json({ error }));
    }
};