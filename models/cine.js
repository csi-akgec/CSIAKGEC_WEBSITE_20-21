const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateEmail = function (email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

//create schema 
const CineSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength: 2,
        maxlength:50
    },
    rollno:{
        type:Number,
        unique:true,
        required: true,
        min:17000000,
        max:199999999999999
    },
    branch:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    email: {
        type: String,
        unique: true,
        required:true,
        trim:true,
        required: 'Email address is required',
        validate: [validateEmail, "Please fill a valid email address"]
    },
    hostler:{
        type:String,
        required:true
    },
    mobile:{
        type: Number,
        min:6000000000,
        max:9999999999
    },
   skills:{
       type:String
   },
   domain:[
       {type:String},
       {type:String}
    //    {type:String}
   ]
,
links:[
    {type:String},
    {type:String},
    {type:String}
]
    
});

const Cine = mongoose.model('cine',CineSchema);
module.exports = Cine;