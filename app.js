const express =require ('express');
const mongoose=require ('mongoose');
const env=require('dotenv/config')
const Book=require('./Models/books')



// view engine


//middleware



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

app.get('/',(req,res)=>{

    res.send('home page')
})

//add books to the data base

app.post('/books/addbooks', (req,res)=>{
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





