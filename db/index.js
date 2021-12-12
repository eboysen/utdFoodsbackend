import pg from "pg";
export const pool = new pg.Pool({
    user:"quqktpmt",
    password:"nh-3VNjSBl_KU5DIIW0mifvJLNt32qPb",
    database: "quqktpmt",
    port: "5432",
    host: "postgres://quqktpmt:nh-3VNjSBl_KU5DIIW0mifvJLNt32qPb@castor.db.elephantsql.com/quqktpmt",
});

export const db = {
    query: (text,params,callback)=>{
        return pool.query(text,params,callback);
    }
}

