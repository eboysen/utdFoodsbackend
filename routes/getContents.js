import { db } from '../db/index.js';
import express from 'express';

const router = express.Router();

const getContents = router.get("/getRecipes",(req,res)=>{
    db.query("SELECT title,id,description FROM recipes ORDER BY title ASC",(error, results)=>{
        if(error){
            console.log(error);
        }
        res.status(200).json(results.rows);
    })
});

export default getContents;
