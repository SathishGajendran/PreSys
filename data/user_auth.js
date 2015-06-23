
var DB=require('./dbconn');
var schema=require('./mongodb/schema/user_auth');

var userAuthModel=DB.model('user_account',schema,'user_accounts');

module.exports={
    findUser:function(args,callback){
        userAuthModel.findOne({username:args.username},function(err,user){
            callback(err,user);
        });
    },
    saveUser:function(args,callback){
        var newUser=new userAuthModel({username:args.username,hash:args.hash,joined:new Date()});
        newUser.save(function(err,user){
           callback(err,user);
        });
    }
};

