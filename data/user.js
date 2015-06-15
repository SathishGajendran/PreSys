
var mongoose=require('mongoose');
var DB=require('./dbconn');
var schema=require('./mongodb/schema/user');

var shared=require('../shared/index');

var user=DB.model('user',schema,'users');

module.exports={
    get:function(args,callback){
        user.find({id:args.id},function(err,res){
            if(res){
                callback(res);
            }
        });
    },
    getAll:function(callback){
        user.find(function(err,res){
            if(res){
                callback(res);
            }
        });
    },
    updateUser:function(args,callback){
        var data={
            name:args.name,
            dob:args.dob,
            gender: args.gender,
            addrLine1: args.addrLine1,
            addrLine2: args.addrLine2,
            city: args.city,
            country: args.country,
            email: args.email,
            mobileNo:args.mobileNo
        };
        user.findOneAndUpdate({id:args.id},data,function(err,res){
            if(res){
                callback(res);
            }
        });
    },
    addUser:function(args,callback){
//        args.id=shared.generateId();
        var data={
            id:shared.generateId(),
            name:args.name,
            dob:args.dob,
            gender: args.gender,
            addrLine1: args.addrLine1,
            addrLine2: args.addrLine2,
            city: args.city,
            country: args.country,
            email: args.email,
            mobileNo:args.mobileNo
        };
        var newUser=new user(data);
        newUser.save(function(err,res){
            callback(res);
        });
    },
    removeUser:function(id,callback){
        user.findOneAndRemove({id:id},function(err,res){
            callback(res);
        });
    }
};

