import { db } from '../db/index.js';
import express from 'express';
import { checkAuthenticated } from '../middleware/auth.js';

const router = express.Router();

const getFiveNew = router.get("/fiveNew",(req,res)=>{
    db.query("SELECT title,id,description FROM recipes ORDER BY id DESC LIMIT 5",(error, results)=>{
        if(error){
            console.log(error);
        }
        res.status(200).json(results.rows);
    })
});

export default getFiveNew;