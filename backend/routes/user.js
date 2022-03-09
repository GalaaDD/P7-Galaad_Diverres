const express = require('express');
const router = express.Router();

//Authentification middleware
const auth = require('../middleware/auth');
//email check
const userCtrl = require('../controllers/user');
// password check
const passwordValidation = require('../middleware/password');


router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getAllUsers', userCtrl.getAllUsers);
router.get('/user/:id', userCtrl.getOneUser);
router.post('/update/:id', auth, userCtrl.updateUser);
router.delete('/delete/:id', auth, userCtrl.deleteUser);


module.exports = router;