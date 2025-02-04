
const Book = require('../models/books');


//addbook to the data base

const book_create=(req,res)=>{

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        genres: req.body.genres,
        published: req.body.published,
        rating: req.body.rating,
        words: req.body.words,
        language: req.body.language,
    })
    console.log(book)
    book.save()
        .then((result) => {
            res.status(200).send(result)
        }).catch((err) => {

            res.status(500).send(err)

        })


}
//get all the book in the database

 const get_allbook=(req,res)=>{
    Book.find()
            .then((result) => {
                res.status(200).send(result)
    
            }).catch((err) => {
                console.log(err);
    
            })


 }

//get a spicific book using an title

const get_book_title=(req, res)=>{
    Book.find({ title: req.params.title })
        .then((result) => {

            res.status(200).send(result)

        }).catch((err) => {
            console.log(err);

        })
} 
//get a spicific book using an id

const get_book_id=(req,res)=>{
    console.log('hello');
    Book.findById(req.params.id)
        .then((result) => {

            res.status(200).send(result)

        }).catch((err) => {
            console.log(err);

        })


}

//get all books by the same authors

const get_book_sameauthor=(res,req)=>{

    Book.find({ author: req.params.author })
        .then((result) => {


            res.status(200).send(result)

        }).catch((err) => {
            console.log(err);

        })


}
//update a book by using the title of the book


const update_book=(req,res)=>{

    Book.updateOne({ title: req.params.title }, req.body)
        .then((result) => {

            res.status(200).send(result)

        }).catch((err) => {
            res.status(500).send({ err: "could not update doc" })
        })


}

// delete a book by title


const delete_book=(req,res)=>{

    Book.deleteOne({ title: req.params.title })
        .then((result) => {

            res.status(200).send(result)

        }).catch((err) => {
            res.status(500).send({ err: "could not delete doc" })
        })


}

//creeate an index to get books rating

const getbook_byindex=(req,res)=>{

    Book.createIndexes({ rating: req.params.index })
    Book.find({ rating: req.params.index }).then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        res.status(500).send({ err: "index could not find" })
    })

}


module.exports={
    
    book_create, get_allbook, get_book_title,
    get_book_id,get_book_sameauthor,update_book,
    delete_book, getbook_byindex
}