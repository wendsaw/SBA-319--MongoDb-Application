const express =require ('express');
const mongoose=require ('mongoose');
const env=require('dotenv/config')



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





