mysql = require('mysql')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db'
});

connection.connect()

connection.query('SELECT 1', function(error, results, fields) {
    if (error) throw error
    
})

connection.end()