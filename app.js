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

//add books to the data base

app.post('/addbooks', (req,res)=>{
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
        res.send(result)
    }).catch((err)=>{

        res.status(500).send(err)

    })


})
//add authors to the data base

app.post('/books/author', (req,res)=>{
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

app.post('/books/reviews', (req,res)=>{
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

//render the list of books/

app.get('/books',(req,res)=>{

        Book.find().then((result)=>{

            res.render('books',{Book})
            
        })

})