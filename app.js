const express =require ('express');
const mongoose=require ('mongoose');
const env=require('dotenv/config');
const morgan=require('morgan')
const Book=require('./models/books');
const Author=require('./models/authors');
const Review=require('./models/reviews');

///route

const bookRoutes=require("./routes/bookroutes");
const authorroutes=require('./routes/authorroute');
const reviewsroutes=require('./routes/reviewsroutes');

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
    console.log(err);
    
})


// view engine
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


//middleware

app.use(express.static("./public"));
app.use('',bookRoutes);
app.use('',authorroutes);
app.use('',reviewsroutes);


//home page

app.get('/',(req,res)=>{

    res.render('home');
   
   })