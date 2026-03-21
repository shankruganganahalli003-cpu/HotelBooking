const mongoose = require("mongoose");


const bookingschema = new mongoose.Schema({    
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"roommodel"
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"authmodel",
        required:true
    },

    checkIn:{
        type:Date,
        required:true

    },

    checkOut:{
        type:Date,
        required:true
    },

    status:{
        type:String,
        enum:["pending","booked"],
        default:"pending"
    },

    phoneno:{
        type:Number,
        required:true
    },

    name:{
        type:String,
        required:true
    },

    




},{timestamps:true});

module.exports = mongoose.model("bookingmodel",bookingschema);