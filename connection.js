const { Pool } = require("pg");
const conn = new Pool({
    user: "postgres",
    host: "localhost",
    database: "widya-restapi",
    password: "root",
    port: "5432"
  });

  conn.connect((err)=>{
    if(err) throw err;
    console.log('PgSQL Connected');
});

module.exports = conn;