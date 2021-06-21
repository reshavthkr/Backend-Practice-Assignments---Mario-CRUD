const mongoose = require('mongoose');

//  Your code goes here
const marioModel = mongoose.model("mariochar", mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
        required:true
    }
    
})
)



module.exports = marioModel;