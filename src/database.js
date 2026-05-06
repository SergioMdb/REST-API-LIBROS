import mysqlConnetion from "mysql2/promise.js";

const properties = { 
    host : "localhost",
    user: "root",
    password: "",
    database: "rest-api"

}

export const pool = mysqlConnetion.createPool(properties);




