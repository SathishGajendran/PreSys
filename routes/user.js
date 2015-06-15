/**
 * Created by Sathish.G on 6/10/15.
 */

var express=require('express');
var userData=require('../data/user');

var user=express();

user.get('/user/:id',function(req,res){
    userData.get(req.params,function(data){
        res.send(data);
    });
});

user.get('/user',function(req,res){
    userData.getAll(function(data){
        res.send(data);
    });
});

user.put('/user/:id',function(req,res){
    if(req.params.id==0){
        userData.addUser(req.body,function(data){
            res.send(data);
        });
    }else{
        userData.updateUser(req.body,function(data){
            res.send(data);
        });
    }
});

user.delete('/user/:id',function(req,res){
    userData.removeUser(req.params.id,function(data){
        res.send(data);
    });
});

module.exports=user;