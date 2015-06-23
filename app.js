/*
 * Created by Sathish.G on 6/10/15.
 * */

var express=require('express');
var http=require('http');
var path=require('path');
var bodyParser=require('body-parser');
var logger=require('morgan');
var routes=require('./routes/index');
var cookieParser = require('cookie-parser');
var expressSession=require('express-session');
var flash=require('connect-flash');
var passport=require('passport');

var app=express();
app.use(logger('dev'));
app.set('views',path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:'secret cat'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/Authenticate')(app,passport);

var port=process.env.PORT || 8080;
app.set('port',port);

app.use(routes);

app.get('/',function(req,res){
    console.log(req.user.username);
    res.render('home',{username:req.user.username});
});

app.use(function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.render('login',{message:req.flash('error')});
    }
});

app.use(function(req,res,next){
    res.send('Not Found');
    next();
});



http.createServer(app)
    .listen(port,function(req,res){
        console.log('server is running at '+port);
    })
    .on('error',function(e){
        console.log('Error '+e);
    });
