import { response } from "express";
import { db } from "../db/index.js";

export async function getUserByUsername(username){
    return new Promise((resolve,reject)=>{
        db.query("SELECT username, password,name,authorized FROM users WHERE username = $1 ",([username]), function(error,results){
            if(error)
                reject(error);
            resolve(results.rows[0]);
        });
    })
    
}