const express = require("express")
const router = express.Router();
const Author = require('../models/authors');




//add authors to the data base

router.post('/author', (req, res) => {
    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationalite: req.body.nationalite,
        nombrebooks: req.body.nombrebooks

    })
    console.log(author)
    author.save()
        .then((result) => {
            res.send(result)
        }).catch((err) => {

            res.status(500).send(err)

        })

})

//get all author in the data base

router.get('/all/author', (req, res) => {


    Author.find()

        .then((results) => {

            res.status(200).send(results)

        }).catch((err) => {
            console.log(err);

        })

})


//get author detail by using author name

router.get('/author/:author', (req, res) => {

    console.log(req.params.author);

    Author.find({ firstName: req.params.author })

        .then((results) => {


            res.status(200).send(results)

        }).catch((err) => {
            console.log(err);

        })



})

//update author by using the author last name

router.put('/author/:author', (req, res) => {


    Author.updateOne({ lastName: req.params.author }, req.body)
        .then((result) => {

            res.status(200).send(result)

        }).catch((err) => {
            res.status(500).send({ err: "could not update doc" })
        })


})

//delete an author by name

router.delete('/author/:author', (req, res) => {


    Author.deleteOne({ lastName: req.params.author })
        .then((result) => {

            res.status(200).send(result)

        }).catch((err) => {
            res.status(500).send({ err: "could not delete doc" })
        })

})




module.exports = router