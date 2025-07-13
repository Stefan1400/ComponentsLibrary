const {
   getAllTagsFromUser,
} = require('../controllers/tagsController');
const express = require('express');
const router = express.Router;

router.get('/tags', getAllTagsFromUser);