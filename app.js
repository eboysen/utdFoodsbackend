import express from 'express';
import { morganMiddleware } from './middleware/morgan.js';
import getRecipes from './routes/getRecipes.js';
import getRecipe from './routes/getRecipe.js';
import postRecipe from './routes/postRecipe.js';
import fileUpload from 'express-fileupload';
import getImageId from './routes/getImageId.js';
import postImage from './routes/postImage.js';
import getMaxID from './routes/getMaxID.js';
import getRandomRecipe from './routes/getRandomRecipe.js';
import getInstructionsId from './routes/getInstructions.js';
import getContents from './routes/getContents.js';
import getFiveNew from './routes/fiveNew.js';
import login from './routes/login.js';
import passport from 'passport';
import LocalStrategy from 'passport';
import register from './routes/register.js';
import { init } from './passport-config.js';
import flash from 'express-flash';
import session from 'express-session';
import ConnectPgSimple from 'connect-pg-simple';
import passportLocal from "passport-local";
import { checkAuthenticated } from './middleware/auth.js';
import { MemoryStore } from 'express-session';
import getFavorites from './routes/getFavorites.js';
import setFavorite from './routes/setFavorite.js';
import removeFavorite from './routes/removeFavorite.js';
import addGroceryItem from './routes/addGroceryItem.js';
import { db, pool } from './db/index.js';
import cors from 'cors';
//import { admin } from 'firebase-admin';
/*
import serviceAccount from './serviceAccountKey.json';

const BUCKET_URL = "gs://utd-foods.appspot.com";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET_URL
});
*/


//set up express and set port number
const app = express();
const PORT = process.env.PORT || 3000;
const pass = passport;
const SessionStore = new MemoryStore({
    checkPeriod: 86400000
});
const routesArray = ['/','/recipe/*','/fiveNew'];

init(pass);
//CORS Header
//app.use(cors());
app.use(function(req, res, next) {
    res.header("withCredentials: true"),
    res.header("Access-Control-Allow-Origin", "https://utd-foods.web.app"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
  });




//express->middleware statements
app.use(express.json());
app.use(morganMiddleware);
app.use(fileUpload({
    createParentPath:true
}));
app.use(flash());
/*app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true,
    secure:false
}));*/
const pgSession = new ConnectPgSimple(session);
app.use(session({
    store: new pgSession({
      pool : pool,                // Connection pool
      tableName : 'session'   // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    secure:false,
    cookie: { 
        maxAge: 10 * 60 * 1000, // 10 minutes
        secure:true,
        httpOnly:false,
        sameSite:'none',
        domain: 'https://utd-foods.web.app'
    } 
  }));
app.use(pass.initialize());
//app.use(pass.session());

app.get('/')

//passport authentication functions
app.post('/login',function (req,res,next){
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
            console.log("USER AT LOG"+req.user);
            return res.status(200).json(req.user);
        });
    }
    console.log(req.sessionID);
    console.log(req.session);
    //return res.redirect('/');
    
    console.log(req.user);

})(req,res,next)});

app.get('/logout', (req,res)=>{
    console.log("logout");
    req.logout();
    res.json('loggedout');
})

app.get('/',pass.initialize(),(req,res)=>{
    let use = req.user
    console.log(use);
    console.log("redirect")
    //console.log(req.user);
    //res.json(req.user);
    res.json("Big Suck");
})

app.get('/isLoggedIn',pass.initialize(),checkAuthenticated,(req,res)=>{
    console.log('logging')
    console.log(req.isAuthenticated)
    console.log(req.session);
    res.json(req.user);
})


  //express routes
  app.use(getRecipes,pass.initialize());
  app.use(getRecipe,pass.initialize());
  app.use(postRecipe,pass.initialize());
  app.use(getImageId,pass.initialize());
  app.use(postImage,pass.initialize());
  app.use(getMaxID,pass.initialize());
  app.use(getRandomRecipe,pass.initialize());
  app.use(getInstructionsId,pass.initialize());
  app.use(getContents,pass.initialize());
  app.use(getFiveNew,pass.initialize());
  app.use(register,pass.initialize());
  app.use(getFavorites,pass.initialize());
  app.use(setFavorite,pass.initialize());
  app.use(removeFavorite,pass.initialize());
  app.use(addGroceryItem,pass.initialize());

//start server
app.listen(PORT,()=>{
    console.log("running on port "+PORT);
});
