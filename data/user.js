
var mongoose=require('mongoose');
var DB=require('./dbconn');
var schema=require('./mongodb/schema/user');

var user=DB.model('user',schema,'users');

module.exports={
    get:function(callback){
        user.find(function(err,res){
            if(res){
                callback(res);
            }
        });
    }
};

