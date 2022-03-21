const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//check if email is already saved
const userCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');

router.post('/create', auth, multer, userCtrl.createPost);
router.post('/update/:id', auth, multer, userCtrl.updatePost);
router.delete('/deletepost/:id', auth, userCtrl.deletePost);
router.get('/posts', auth, userCtrl.getAllPosts);
router.get('/post/:id', auth, userCtrl.getOnePost);

module.exports = router;