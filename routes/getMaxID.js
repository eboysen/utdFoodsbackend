import { db } from '../db/index.js';
import express from 'express';

const router = express.Router();

const getMaxID = router.get('/maxID',(req,res)=>{
    db.query("SELECT * FROM recipes TABLESAMPLE SYSTEM(0.00001) LIMIT 1",(error,results)=>{
        if(error){
            console.log(error);
            throw error;
        }
        console.log(results.rows.max);
        res.status(200).send(results.rows);
    })
});

export default getMaxID;