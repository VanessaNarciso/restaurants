const express = require('express'); 
const mysql = require('mysql'); 
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

app.use(bodyParser.json());

const app = express();




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

app.listen(PORT, () => console.log(`server running on port ${PORT}`));



//rutas
//config 

