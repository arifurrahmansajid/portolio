const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById, createBlog, deleteBlog } = require('../controllers/blogController');
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', createBlog);
router.delete('/:id', deleteBlog);
module.exports = router;
