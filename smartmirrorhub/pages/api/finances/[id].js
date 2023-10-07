// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
// get the client
let mysql = require('mysql2/promise');
 var data = [];
 var dummy = [];
// create the connection to database
let connection = await mysql.createPool({
  host: process.env.DB_IP,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'finances',
  waitForConnections: true,
  connectionLimit:0,
  queueLimit: 0
});

// execute will internally call prepare and query
let [rows,fields]= await connection.execute('SELECT * FROM itemization',[2,2]);
    res.json(rows);
}
