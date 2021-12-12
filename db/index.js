import pg from "pg";
export const pool = new pg.Pool({
    user:"quqktpmt",
    password:"AAsjtrHgPmF5YbSUklXk_cVEwn3J3Zu7",
    database: "quqktpmt",
    port: "5432",
    host: "castor.db.elephantsql.com "
});

export const db = {
    query: (text,params,callback)=>{
        return pool.query(text,params,callback);
    }
}

