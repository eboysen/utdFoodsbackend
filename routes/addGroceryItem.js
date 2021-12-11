import express from 'express';
import {db} from '../db/index.js';
import { checkAuthenticated } from '../middleware/auth.js';

const router = express.Router();

const addGroceryItem = router.get('/addGroceryItem/:id',checkAuthenticated, (req,res)=>{
    
    console.log(req.params.id);
    let id = req.params.id;
    let username = req.user.username;
    db.query("INSERT INTO GROCERIES VALUES ($1,$2);",[id,username],(error,results)=>{
        if(error){
            throw error;
            console.log('query error');
        }
        console.log(req.user);
        res.json(results.rows);
    })
});

export default addGroceryItem;