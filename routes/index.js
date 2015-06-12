/**
 * Created by Sathish G on 6/10/15.
 */

var express=require('express');
var user=require('./user');

var app=express();
app.use(user);

module.exports=app;


