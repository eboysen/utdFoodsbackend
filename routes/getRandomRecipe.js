import { db } from '../db/index.js';
import express from 'express';

const router = express.Router();

const getRandomRecipe = router.get('/random/:num',(req,res)=>{
    db.query("SELECT id,title FROM recipes ORDER BY random() LIMIT "+req.params.num+";",(error,results)=>{
        if(error){
            console.log(error);
            throw error;
        }
        console.log(results.rows.max);
        res.status(200).send(results.rows);
    })
});

export default getRandomRecipe;