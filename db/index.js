import pg from "pg";
export const pool = new pg.Pool({
    user:"me",
    password:"password",
    database: "recipes",
    port: "5432",
    host: "localhost",
});

export const db = {
    query: (text,params,callback)=>{
        return pool.query(text,params,callback);
    }
}

