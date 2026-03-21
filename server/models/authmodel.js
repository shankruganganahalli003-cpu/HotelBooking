const mongoose = require("mongoose");


const authschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
});

module.exports = mongoose.model("authmodel",authschema);