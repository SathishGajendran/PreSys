
var mongoose=require('mongoose');

var dbconn=mongoose.createConnection('mongodb://admin:adminPass@proximus.modulusmongo.net:27017/dO6hydot');

module.exports=dbconn;