
const express = require("express")
const router = express.Router();
const Review = require('../models/reviews');



//add reviews to the reviews data base

router.post('/book/review', (req, res) => {
    const reviews = new Review({
        Name: req.body.Name,
        bookTitle: req.body.bookTitle,
        reviews: req.body.reviews,
        datereviews: req.body.datereviews

    })
    console.log(reviews)
    reviews.save()
        .then((result) => {
            res.send(result)
        }).catch((err) => {

            res.status(500).send(err)

        })

})

//get all the book reviews

router.get('/all/review', (req, res) => {

    Review.find().then((result) => {

        res.status(200).send(result)

    }).catch((err) => {
        console.log(err);

    })


})
//  /get a specific review on a book using the book name

router.get('/review/:title', (req, res) => {

    Review.find({ bookTitle: req.params.title }).then((result) => {

        res.status(200).send(result)

    }).catch((err) => {
        console.log(err);

    })
})

///put or patch request


//update book review by using reviewer name

router.put('/review/:id', (req, res) => {


    Review.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {

            console.log("updated");

            res.status(200).send(result)

        }).catch((err) => {
            res.status(500).send({ err: "could not update doc" })
        })

})

///deletete request

//delete a reviewer using id

router.delete('/review/:id', (req, res) => {

    console.log(req.body);
    Review.findByIdAndDelete(req.params.id)
        .then((result) => {


            res.status(200).send(result)

        }).catch((err) => {
            res.status(500).send({ err: "could not delete doc" })
        })

})


module.exports = router;