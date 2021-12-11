import { db } from '../db/index.js';
import express from 'express';

const router = express.Router();

const getImageId = router.get('/images/:id',(req,res)=>{
    try{
        console.log(res.status);
        res.status(200).sendFile("C:/Users/Eric/Desktop/utdFoods/backend/images/"+req.params.id+".JPG");}
    catch(e){
        res.status(200).sendFile("C:/Users/Eric/Desktop/utdFoods/backend/images/default.JPG");
    }
});

export default getImageId;