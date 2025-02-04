const express = require("express")
const router = express.Router();

const author_controller=require('../controllers/authorcontrollers');

router.post('/author', (author_controller.create_author))

router.get('/all/author', (author_controller.get_allauthor))

router.get('/author/:author', (author_controller.getauthor_detail))

router.put('/author/:author', (author_controller.update_author))

//delete an author by name

router.delete('/author/:author', (author_controller.delete_author))




module.exports = router