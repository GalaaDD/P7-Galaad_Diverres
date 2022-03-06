const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
// Controle si l'email de l'utilisateur est déja enregistrer
const userCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');

router.post('/create', auth, multer, userCtrl.CreatePost);
router.post('/update/:id', auth, multer, userCtrl.modifyPost);
router.delete('/delete/:id', auth, userCtrl.deletePost);
router.get('/', auth, userCtrl.getAllPost);
router.get('/:id', auth, userCtrl.getOnePost);

module.exports = router;