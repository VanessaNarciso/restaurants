/* Vanessa Narciso Hidalgo 2020*/

const mysql = require('mysql'); 

//MySQL 
const connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root',
	password: 'rootpass',
	database: 'restaurants_information'
}); 

//Check connection 
connection.connect(error => {
	if(error) throw error; 
	console.log('Database server running');
}); 

module.exports = connection;