var pg = require('pg');
var conString = "postgres://root:hendri1998@localhost:5432/widya-restapi";

var client = new pg.Client(conString);
client.connect();


conn.connect((err)=>{
    if(err) throw err;
    console.log('PgSQL Connected');
});

module.exports = conn;