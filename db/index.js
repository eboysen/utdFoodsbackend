import pg from "pg";
export const pool = new pg.Pool({
    user:"kbjznltbglheft",
    password:"bf27d875671f2ef249403dfce069b3a71fca564184842e31a4fea8546006db04",
    database: "d4m0evl1529etv",
    port: "5432",
    host: "ec2-34-195-69-118.compute-1.amazonaws.com",
});
// export const pool = new pg.Client("postgres://quqktpmt:AAsjtrHgPmF5YbSUklXk_cVEwn3J3Zu7@castor.db.elephantsql.com/quqktpmt");

export const db = {
    query: (text,params,callback)=>{
        return pool.query(text,params,callback);
    }
}

