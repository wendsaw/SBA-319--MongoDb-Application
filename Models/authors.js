const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const authorSchema=new Schema({

    lastName:{
        type:String,
        require:true
    },

    firstName:{
        type:String,
        required:true
        
    },
    nationalite:{
        type:String,
        required:true
    
    },
    nombrebooks:{
        type:Number,
        required:true
    },


}, {timestamps:true})

const Author=mongoose.model('author', authorSchema);

module.exports= Author;