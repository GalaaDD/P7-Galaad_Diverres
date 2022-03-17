const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');



router.post('/comment', auth, commentCtrl.createComment);
router.delete('/comment/:id', auth, commentCtrl.deleteComment);
router.get('/comment/post/:postId', auth, commentCtrl.getAllCommentsByPost);
router.get('/comment/:id', auth, commentCtrl.getOneComment);

module.exports = router;