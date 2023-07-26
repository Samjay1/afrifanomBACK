const mysql = require('mysql');


let connection = mysql.createPool({
    connectionLimit: 2,
    host: 'localhost',
    user: 'root',
    database: 'afrifanom',
    charset: 'utf8mb4'
})


module.exports = connection