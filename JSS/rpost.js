
const postController = require("./cpost")
const express = require('express')
const router = express.Router();

router.get('/',postController.getPost);
router.post('/',postController.createPost);
module.exports = router
