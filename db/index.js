import pg from "pg";
export const pool = new pg.Pool({
    user:"quqktpmt",
    password:"AAsjtrHgPmF5YbSUklXk_cVEwn3J3Zu7",
    database: "quqktpmt",
    port: "5432",
    host: "postgres://quqktpmt:AAsjtrHgPmF5YbSUklXk_cVEwn3J3Zu7@castor.db.elephantsql.com/quqktpmt ",
});

export const db = {
    query: (text,params,callback)=>{
        return pool.query(text,params,callback);
    }
}

