

const Review = require('../models/reviews');


//add reviews to the reviews data base

const create_review=(res,req)=>{
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


}

//get all the book reviews

const get_allreviews=(req,res)=>{

    Review.find().then((result) => {

        res.status(200).send(result)

    }).catch((err) => {
        console.log(err);

    })

}

//  /get a specific review on a book using the book name
const get_review_bybook=(req,res)=>{

    Review.find({ bookTitle: req.params.title }).then((result) => {

        res.status(200).send(result)

    }).catch((err) => {
        console.log(err);

    })

}


//update book review by using reviewer name

const update_review=(req,res)=>{

    Review.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {

            console.log("updated");

            res.status(200).send(result)

        }).catch((err) => {
            res.status(500).send({ err: "could not update doc" })
        })

}

//deletete request

//delete a reviewer using id
const delete_review=(req,res)=>{

    console.log(req.body);
    Review.findByIdAndDelete(req.params.id)
        .then((result) => {

            res.status(200).send(result)

        }).catch((err) => {
            res.status(500).send({ err: "could not delete doc" })
        })


}



module.exports={ 
    create_review,get_allreviews,get_review_bybook,
    update_review,delete_review


}