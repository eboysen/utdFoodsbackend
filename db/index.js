import pg from "pg";
/*export const pool = new pg.Pool({
    user:"me",
    password:"password",
    database: "recipes",
    port: "5432",
    host: "localhost",
});*/
 export const pool = new pg.Client("postgres://quqktpmt:AAsjtrHgPmF5YbSUklXk_cVEwn3J3Zu7@castor.db.elephantsql.com/quqktpmt");

export const db = {
    query: (text,params,callback)=>{
        return pool.query(text,params,callback);
    }
}

