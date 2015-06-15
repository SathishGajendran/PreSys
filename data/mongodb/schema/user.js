
var mongoose=require('mongoose');

var user=mongoose.Schema({
    id:Number,
    name:String,
    dob:Date,
    gender: String,
    addrLine1: String,
    addrLine2: String,
    city: String,
    country: String,
    email: String,
    mobileNo:String
});

module.exports=user;