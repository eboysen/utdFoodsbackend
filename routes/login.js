import { db } from '../db/index.js';
import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { init } from '../passport-config.js';
import passportLocal from "passport-local";

const router = express.Router();

const login = router.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}));

export default login;
/*
passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
})
*/