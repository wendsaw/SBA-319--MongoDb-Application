const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const bookSchema=new Schema({

    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    
    },
    pages:{
        type:Number,
        required:true
    },
    genres:{
        type:String,
        required:true
    },
    published:{
        type:Date,
        required:true
    },

    rating:{
        type:Number,
        required:true,
        min:1,
        max:10,

    },
    words:{
        type:Number,
        required:true
    },
    language:{
        type:String,
        required:true
    },


}, {timestamps:true})

const Book=mongoose.model('book', bookSchema);

module.exports= Book