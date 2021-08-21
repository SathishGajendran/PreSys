
var mongoose=require('mongoose');

var connectionString = 'mongodb+srv://mongoadmin:mongoadmin123@mydatacluster.mub49.mongodb.net/presys?retryWrites=true&w=majority';

var dbconn=mongoose.createConnection(connectionString);

module.exports=dbconn;