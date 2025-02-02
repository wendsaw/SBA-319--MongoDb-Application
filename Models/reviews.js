const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const reviewSchema=new Schema({

    Name:{
        type:String,
        required:true
    },
    bookTitle:{
        type:String,
        required:true,
        // unique:['Things Fall Apart','Disgrace ',' Cry, the Beloved Country'
        //     ,' Season of Migration to the North ',' Arrow of God']
    
    },
    reviews:{
        type:String,
        required:true
    
    },
    datereviews:{
        type:Date,
        required:true
    }

}, {timestamps:true})

const Review=mongoose.model('reviews', reviewSchema);

module.exports= Review;