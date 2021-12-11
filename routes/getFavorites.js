import express from 'express';
import {db} from '../db/index.js';
import { checkAuthenticated } from '../middleware/auth.js';

const router = express.Router();

const getFavorites = router.get('/favorites',checkAuthenticated, (req,res)=>{
    console.log('favorites');
    console.log(req.params.username);
    let username = req.user.username;
    console.log(req.user);
    db.query("SELECT Recipes.id, Recipes.description, Recipes.title, Favorites.username FROM RECIPES INNER JOIN Favorites ON Recipes.id=favorites.recipeid WHERE Favorites.username =$1;",[username],(error,results)=>{
        if(error){
            throw error;
            console.log('query error');
        }
        console.log(req.user);
        res.json(results.rows);
    })
});

export default getFavorites;