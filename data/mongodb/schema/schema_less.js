
var mongoose=require('mongoose');

var schema=new mongoose.Schema(
    {
        any:{}
    },
    {
        strict:false
    }
);

module.exports=schema;