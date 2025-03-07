const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',        
    user: 'root',             
    password: '1234567890',
    database: 'school_management' 
});


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;
