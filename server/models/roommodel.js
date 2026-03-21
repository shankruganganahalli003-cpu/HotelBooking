const mongoose = require("mongoose");


const roomschema = new mongoose.Schema({
    roomNumber:{
        type:String,
        required:true
    },

    type:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },
    
    image:{
        type:[String],
        required:true
    },

    location:{
        type:String,
        required:true
    },

    desc:{
        type:String,
        required:true
    },

    member:{
        type:Number,
        required:true
    }

});

module.exports = mongoose.model("roommodel",roomschema);