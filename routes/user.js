/**
 * Created by Sathish.G on 6/10/15.
 */

var express=require('express');
var userData=require('../data/user');

var user=express();

user.get('/user',function(req,res){
    userData.get(function(data){
        res.send(data);
    });
});

module.exports=user;