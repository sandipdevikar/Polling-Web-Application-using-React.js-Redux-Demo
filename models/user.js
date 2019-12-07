const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({

    
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        avatar:{
            type:String
        },
        Date:{
            type:Date,
            default:Date.now
        },
        UserType:{
            type:String,
            default:"customer"
        }


   


});
module.exports= User =mongoose.model('user',UserScheme)

