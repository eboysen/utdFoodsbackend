import { db } from '../db/index.js';
import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { init } from '../passport-config.js';
import passportLocal from "passport-local";

const router = express.Router();

const login = router.post('/login',function (req,res,next){
    pass.authenticate('local', (err,user,info)=>{
    if(err)
        return next(err);
    if(user==false){
        res.status(200).json('Username or password are incorrect');
    }
    else{
        req.login(user,function(err){
            if(err)
                return next(err);
            return res.status(200).json(req.user);
        });
    }
    console.log(req.sessionID);
    console.log(req.session);
    //return res.redirect('/');
    
    console.log(req.user);

})(req,res,next)});

export default login;
/*
passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
})
*/