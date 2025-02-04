
const express = require("express")
const router = express.Router();

const book_controller=require('../controllers/bookcontrollers');


router.post('/book', (book_controller.book_create))

router.get('/book', (book_controller.get_allbook))

router.get('/book/:title', (book_controller.get_book_title))

router.get('/:id', (book_controller.get_book_id))

router.get('/data/:author', (book_controller.get_book_sameauthor))

/
router.put('/book/:title', (book_controller.update_book))


router.delete('/book/:title', (book_controller.delete_book))


router.get('/index/:index', (book_controller.getbook_byindex))



module.exports = router;