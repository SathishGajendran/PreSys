
var mongoose=require('mongoose');

var userAuth=new mongoose.Schema({
    username:String,
    hash:String,
    joined:Date
});

module.exports=userAuth;