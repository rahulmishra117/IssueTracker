const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const User=require('../model/user');

let opts={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'secret'
}

passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log("Error finding User in jwt");
            return;
        }
        if(user)
        return done(null,user);
        else
        return done(null,false);
    })
}))

module.exports=passport;