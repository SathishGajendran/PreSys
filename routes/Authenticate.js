
var cipher=require('bcrypt-nodejs');
var localStrategy=require('passport-local').Strategy;
var userAuth=require('../data/user_auth');

module.exports=function(app,passport){

    app.get('/signup', function(req, res) {
        res.render('signup');
    });


    passport.serializeUser(function(user,done){
        done(null,user.username);
    });

    passport.deserializeUser(function(user,done){
        userAuth.findUser({username:user},function(err,user){
            done(err,user);
        });
    });

    passport.use(new localStrategy(function(username,password,done){
        process.nextTick(function(){
            userAuth.findUser({username:username},function(err,user){
                if(err) return done(null,false);
                if(!user) return done(null,false,{message:'Username or Password Incorrect'});
                if(user){
                    cipher.compare(password,user.hash,function(err,validUser){
                        if(validUser){
                            return done(null,user);
                        }else{
                            return done(null,false,{message:'Username or Password Incorrect'});
                        }
                    });
                }
            });
        });
    }));

    app.post('/login',
        passport.authenticate('local',{
            successRedirect:'/',
            failureRedirect:'/login',
            failureFlash:true
        })
    );

    app.post('/signup',function(req,res,next){
        var user=req.body;
        userAuth.findUser({username:user.username},function(err,result){
            if(!result){
                cipher.hash(user.password,null,null,function(herr,hash){
                    userAuth.saveUser({username:user.username,hash:hash},function(err,newuser){
                        req.login(newuser,function(err){
                            if(err) return next(err);
                            return res.redirect('/');
                        });
                    });

                });
            }else{
                res.send('User already Exist');
            }
        });

    });

    app.get('/login', function(req,res) {
        if(!req.isAuthenticated()){
            res.render('login',{message:req.flash('error')});
        }else{
            res.redirect('/');
        }
    });

    app.get('/logout',function(req,res){
        if(req.isAuthenticated()){
            req.logout();
            res.redirect('login');
        }else{
            res.send('you are not logged in...');
        }
    });
};