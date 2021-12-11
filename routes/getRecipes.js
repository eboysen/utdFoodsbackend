import { db } from '../db/index.js';
import express from 'express';

const router = express.Router();

const getRecipes = router.get("/getRecipes/:keyword",(req,res)=>{
    db.query("SELECT title,id,description FROM recipes WHERE title ~* '"+req.params.keyword+"' OR tags ~* '"+ req.params.keyword+"' OR description ~* '"+ req.params.keyword+"' ORDER BY title ASC",(error, results)=>{
        if(error){
            console.log(error);
        }
        res.status(200).json(results.rows);
    })
});

export default getRecipes;
