import { db } from '../db/index.js';
import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

const register = router.post('/register',async (req,res)=>{
    if(!req.body){
        return
    }
    const {username,password,name}=req.body;
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        db.query("insert into users (username,password,name,authorized) values ($1,$2,$3,'standard')", [username,hashedPassword,name],(error,results)=>{
            if(error){
                throw error;
                console.log('query error');
            }
            res.json(results.rows);
        })
    }
    catch(e){
        console.log(e);
    }
    

});

export default register;