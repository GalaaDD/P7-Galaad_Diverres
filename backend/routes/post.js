const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//check if email is already saved
const userCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');

router.post('/post', auth, multer, userCtrl.createPost);
router.put('/post/:id', auth, multer, userCtrl.updatePost);
router.put('/post/moderation/', auth, userCtrl.canBeDisplay);
router.get('/post/admin', auth, multer, userCtrl.getAllPostsAdmin);
router.delete('/post/:postId', auth, userCtrl.deletePost);
router.get('/post/display', auth, userCtrl.getAllPosts);
//router.get('/post/:id', auth, userCtrl.getOnePost);

module.exports = router;