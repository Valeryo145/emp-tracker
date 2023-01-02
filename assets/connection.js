require("dotenv").config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_db'
});

function handleConnection(err) {
   if (err) throw err;
   console.log(`connected as id ${connection.threadId}`);
}
module.exports = connection;