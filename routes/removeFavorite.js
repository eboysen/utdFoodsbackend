import express from 'express';
import {db} from '../db/index.js';
import { checkAuthenticated } from '../middleware/auth.js';

const router = express.Router();

const removeFavorite = router.delete('/removeFavorite/:id',checkAuthenticated, (req,res)=>{
    console.log(req.session);
    console.log(req.params.id);
    let id = req.params.id;
    let username = req.user.username;
    console.log(username);
    db.query("DELETE FROM FAVORITES WHERE recipeid=$1 AND username=$2;",[id,username],(error,results)=>{
        if(error){
            throw error;
            console.log('query error');
        }
        console.log(req.user);
        res.json(results.rows);
    })
});

export default removeFavorite;
/*


*/