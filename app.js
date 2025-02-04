const express =require ('express');
const mongoose=require ('mongoose');
const env=require('dotenv/config');
const morgan=require('morgan')
const Book=require('./models/books');
const Author=require('./models/authors');
const Review=require('./models/reviews');

//app setup and db connection
const app=express();
app.use(express.json());

//coonecting to the database before connecting to local host 3000

mongoose.connect(process.env.URL).then(()=>{
    app.listen(3000,()=>{
        console.log("listening on port 3000");
        console.log('data base connected'); 
    })
}).catch((err)=>{
    console.log(erro);
    
})


// view engine
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


//middleware

app.use(express.static("./public"));


//home page

app.get('/',(req,res)=>{

    
    res.render('home');
   
   })

//post request

//addbook to the data base

app.post('/book', (req,res)=>{
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        genres:req.body.genres,
        published:req.body.published,
        rating:req.body.rating,
        words:req.body.words,
        language:req.body.language,
    })
    console.log(book)
    book.save()
    .then((result)=>{
        res.status(200).send(result)
    }).catch((err)=>{

        res.status(500).send(err)

    })


})
//add authors to the data base

app.post('/author', (req,res)=>{
    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationalite: req.body.nationalite,
        nombrebooks:req.body.nombrebooks
    
    })
    console.log(author)
    author.save()
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{

        res.status(500).send(err)

    })

})

//add reviews to the data base

app.post('/book/reviews', (req,res)=>{
    const reviews = new Review({
        Name: req.body.Name,
        bookTitle: req.body.bookTitle,
        reviews: req.body.reviews,
        datereviews:req.body.datereviews

    })
    console.log(reviews)
    reviews.save()
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{

        res.status(500).send(err)

    })

})

//get request

//get all the book in the database

app.get('/books',(req,res)=>{

        Book.find()
        .then((result)=>{
            res.status(200).send(result)
            
        }).catch((err)=>{
            console.log(err);
            
        })

})
//get a spicific book using an title

app.get('/book/:title', (req, res) => {

    Book.find({title:req.params.title})
    .then((result)=>{

        res.status(200).send(result)
        
    }).catch((err)=>{
        console.log(err);
        
    })
    
})

//get a spicific book using an id

app.get('/:id', (req,res) => {

    console.log('hello');
    Book.findById(req.params.id)
    .then((result)=>{

    res.status(200).send(result)
        
    }).catch((err)=>{
        console.log(err);
        
    })
    
})


//get all books by the same authors

app.get('/book/:author',(req,res)=>{

    Book.find({author:req.params.author})
    .then((result)=>{
  

        res.status(200).send(result)
        
    }).catch((err)=>{
        console.log(err);
        
    })

})


//get author detail by using author name

app.get('/author/:author', (req, res) => {

    console.log(req.params.author);

    Author.find({firstName:req.params.author})

    .then((results)=>{

        console.log(results[0].nationalite);
        
        res.status(200).send(results)
        
    }).catch((err)=>{
        console.log(err);
        
    })


    
})

//get all the book reviews

app.get('/data/reviews', (req, res) => {

    Review.find().then((result)=>{

        res.status(200).send(result)
        
    }).catch((err)=>{
        console.log(err);
        
    })


})
//  /get a specific review on a book using the book name

 app.get('/reviews/:title', (req, res) => {

    Review.find({bookTitle:req.params.title}).then((result)=>{

        res.status(200).send(result)
        
    }).catch((err)=>{
        console.log(err);
        
    })
 })

///put or patch request

//update a book by using the title of the book

app.put('/book/:title', (req ,res)=>{

    
    Book.updateOne({title:req.params.title},req.body)
    .then((result)=>{

        res.status(200).send(result)

    }).catch((err)=>{
        res.status(500).send({err:"could not update doc"})
    })
    
    
})

//update author by using the author last name

app.put('/author/:author', (req ,res)=>{

    
    Author.updateOne({lastName:req.params.author},req.body)
    .then((result)=>{

        res.status(200).send(result)

    }).catch((err)=>{
        res.status(500).send({err:"could not update doc"})
    })
    
    
})

//update book review by using reviewer name

app.put('/review/:id', (req ,res)=>{

    
    Review.findByIdAndUpdate(req.params.id,req.body)
    .then((result)=>{

        console.log("updated");
        
        res.status(200).send(result)

    }).catch((err)=>{
        res.status(500).send({err:"could not update doc"})
    })
    
    
})



///deletete request

// delete a book by title

app.delete('/book/:title', (req ,res)=>{

    
    Book.deleteOne({title:req.params.title})
    .then((result)=>{

        res.status(200).send(result)

    }).catch((err)=>{
        res.status(500).send({err:"could not delete doc"})
    })
    
    
})

//delete an author by name

app.delete('/author/:author', (req ,res)=>{

    
    Author.deleteOne({lastName:req.params.author})
    .then((result)=>{

        res.status(200).send(result)

    }).catch((err)=>{
        res.status(500).send({err:"could not delete doc"})
    })
    
})

//delete a reviewer using id

app.delete('/review/:id', (req ,res)=>{

    console.log(req.body);
    Review.findByIdAndDelete(req.params.id)
    .then((result)=>{

        
        
        res.status(200).send(result)

    }).catch((err)=>{
        res.status(500).send({err:"could not delete doc"})
    })

})

//creeate an index to get books rating

app.get('/books/:index', (req,res)=>{

   console.log(req.params.index);
   Book.createIndexes({rating:req.params.index})
    Book.find({rating:req.params.index}).then((result)=>{
        res.status(200).send(result)
    }).catch((err)=>{
        res.status(500).send({err:"index could not find"})
    })
})


