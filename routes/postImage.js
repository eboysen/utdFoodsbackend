import { db } from '../db/index.js';
import express from 'express';

const router = express.Router();

const postImage = router.post('/image/:id',async(req,res)=>{
    console.log(req.files);
    try{
        console.log(req.files.exampleImg);
        let image = req.files.exampleImg;
        image.mv('C:/Users/Eric/Desktop/utdFoods/backend/images/'+req.params.id+'.jpg');

        res.send({
            status:true,
            message:"File uploaded",
            data:{
                name:image.name,
                mimetype: image.mimetype,
                size: image.size
            }
        });
    }
    catch(err){
        console.log(err);
    }
});

export default postImage;