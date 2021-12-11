import { db } from "./db/index.js";
import bcrypt from 'bcrypt';
import passportLocal from "passport-local";
import { getUserByUsername } from "./routes/getUserByUsername.js";


export function init(pass){
    const strat = passportLocal.Strategy;
    var user;
    const authenticateUser = async (username,password,done) =>{
        user = await getUserByUsername(username);
        if(user == null){
            return done(null,false,{message:'No user with that username'});
        }
        try{
            if(await bcrypt.compare(password,user.password)){
                return done(null, user)
            }else{
                return done(null,false,{message:'Incorrect password'});
            }
        }
        catch(e){
            return done(e);
        }     
        
    }
    console.log('hello');
    pass.use(new strat({},authenticateUser));
    pass.serializeUser(function(user,done){
        if(user){
            console.log("User exists");
            return done(null,user.username);}
    });
    pass.deserializeUser(async function (username,done){
        console.log("deserialize");
        try{
            let user = await getUserByUsername(username);
            if(!user){
                return done(new Error('user not found'));
            }
            done(null,user);
        }
        catch(e){done(e)}
        
    });
}