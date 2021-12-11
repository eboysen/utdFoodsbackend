import express from 'express';
import {db} from '../db/index.js';
import { checkAuthenticated } from '../middleware/auth.js';

const router = express.Router();

const getRecipe = router.get('/recipe/:id',(req,res)=>{
    console.log(req.user);
    db.query("SELECT * FROM RECIPES FILTER WHERE id='"+req.params.id+"';",(error,results)=>{
        if(error){
            throw error;
            console.log('query error');
        }
        res.json(results.rows);
    })
});

export default getRecipe;