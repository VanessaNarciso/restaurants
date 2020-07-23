var url = require('url');
const connection = require('../config.js');
const geokit = require('geokit');
const math = require('mathjs');

const getRestaurant = function (req, res){
	const{id }= req.params
	const sql = `SELECT * FROM restaurants WHERE id = "${id}"`;
	console.log(sql);
	connection.query(sql, (error,result) => {
		if (error) throw error;
		if(result.length > 0){
			res.json(result);
		}else{
			res.send('No result');
		}
	});
}


const getRestaurants = function (req, res){
	const sql = 'SELECT * FROM restaurants';
	connection.query(sql, (error,results) => {
		if (error) throw error;
		if(results.length > 0){
			res.json(results);
		}else{
			res.send('Empty Table');
		}
	});
}

const createRestaurant = function (req, res){
	const sql = 'INSERT INTO restaurants SET ?'; 
	const restaurantObj = {
		id: req.body.id,
		rating: req.body.rating,
		name: req.body.name,
		site: req.body.site,
		email: req.body.email,
		phone: req.body.phone,
		street: req.body.street,
		city : req.body.city,
		state: req.body.state,
		lat: req.body.lat,
		lng: req.body.lng
	};

	connection.query(sql, restaurantObj, error => {
		if(error) throw error;
		res.send('restaurant created!');
	});
}

const updateRestaurant = function (req, res){
	const{id} = req.params;
	const{ rating, name, site, email, phone, street, city, state, lat, lng} = req.body;
	const sql = `UPDATE restaurants SET rating= '${rating}', name= '${name}', site= '${site}', email= '${email}', phone= '${phone}', street= '${street}', city= '${city}', state= '${state}', lat= '${lat}', lng= '${lng}' WHERE id= "${id}"`;
	connection.query(sql, error => {
		if(error) throw error;
		res.send('restaurant updated!');
	});


}
const deleteRestaurant = function (req, res){

	const {id} = req.params;
	const sql= `DELETE FROM restaurants WHERE id="${id}"`;
	connection.query(sql, error => {
		if(error) throw error;
		res.send('Restaurant deleted!');
	});
}

const statistics = function (req, res){
	const latstat = parseFloat(req.query.latitude);
	const lngstat = parseFloat(req.query.longitude);
	const rad = req.query.radius;
	var myLat = 0; 
	var myLng = 0;
	let distance = 0;
	let inRadio = [];
	const sql = 'SELECT * FROM restaurants';
	connection.query(sql, (error,results) => {
		if (error) throw error;
		if(results.length > 0){
			for (var k in results){
				 myLat = results[k]["lat"];
				 myLng = results[k]["lng"];
				 const start = {lat: latstat, lng: lngstat};
				 const end = {lat: myLat, lng: myLng};

				distance = geokit.distance(start,end);
				if(distance < rad){
                    inRadio.push(results[k]);
				}
			}


			let ratingSum = 0;
			const len = inRadio.length;
			let item = null;
			//Average Rating 
			for (let i = 0; i < len; i++) {
		    	item = inRadio[i];
		        ratingSum = parseFloat(item.rating) + ratingSum;
			}
			const averageRating = ratingSum / len;
			

			//Standar Deviation
			let stanSum = 0;
			let item1 = null;
			for (let i = 0; i < len; i++) {
		    	item1 = inRadio[i];
		   
		        stanSum = (math.square(item1.rating - averageRating)) + stanSum//llevar al cuadrado 
			}

			const stanDev = math.sqrt(stanSum/len);	
			res.json({count: len, avg: averageRating, std: stanDev})
			

		}else{
			res.send('No results');
		}
	});

}


module.exports = {
	getRestaurants : getRestaurants,
	getRestaurant : getRestaurant,
	createRestaurant : createRestaurant,
	updateRestaurant : updateRestaurant,
	deleteRestaurant : deleteRestaurant,
	statistics : statistics
}
















