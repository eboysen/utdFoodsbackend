import { db } from '../db/index.js';
import express from 'express';
import * as fs from 'fs';

const router = express.Router();

const getInstructionsId = router.get('/instructions/:id',(req,res)=>{
    console.log(res.status);
    fs.readFile("C:/Users/Eric/Desktop/utdFoods/backend/instructions/"+req.params.id+".txt",'utf8',(err,data)=>{
        if(err){
            console.log(err);
        }
        console.log(data);
        
        res.status(200).json(data);
    })
});

export default getInstructionsId;