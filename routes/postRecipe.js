import express from 'express';
import {db} from '../db/index.js';
import * as fs  from 'fs';

const router = express.Router();

const postRecipe = router.post('/post-recipe',(req,res)=>{
    if(!req.body){
        return
    }
    const {title,author,ingredients,measurements,description,tags,steps}=req.body;
    db.query("insert into recipes (title,author,ingredients,measurements,description,tags) values ($1,$2,$3,$4,$5,$6) RETURNING *", [title,author,ingredients,measurements,description,tags],(error,results)=>{
        if(error){
            throw error;
            console.log('query error');
        }
        console.log(results.rows);
        fs.writeFile('./instructions/'+results.rows[0].id+'.txt',steps,err=>{
            if(err){
                console.log(err);
                return
            }
        });
        res.json(results.rows);
    });
    
});

export default postRecipe;