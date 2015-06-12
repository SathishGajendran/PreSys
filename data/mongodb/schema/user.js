
var mongoose=require('mongoose');

var user=mongoose.Schema({
    id:Number,
    name:String,
    country:String
});

module.exports=user;