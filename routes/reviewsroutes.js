
const express = require("express")
const router = express.Router();
const reviewcontrollers=require('../controllers/reviewcontrollers')


router.post('/book/review', (reviewcontrollers.create_review))

router.get('/all/review', (reviewcontrollers.get_allreviews))

router.get('/review/:title', (reviewcontrollers.get_review_bybook))

router.put('/review/:id', (reviewcontrollers.update_review))

router.delete('/review/:id', (reviewcontrollers.delete_review))


module.exports = router;