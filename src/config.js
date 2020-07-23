/* Vanessa Narciso Hidalgo 2020*/

const mysql = require('mysql'); 

//MySQL 
const connection = mysql.createConnection({
	host: 'us-cdbr-east-02.cleardb.com', 
	user: 'b08125060c8160',
	password: '7afa57bc',
	database: 'heroku_da3cbc41b8a02df'
}); 
//Check connection 
connection.connect(error => {
	if(error) throw error; 
}); 

module.exports = connection;