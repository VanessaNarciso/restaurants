/* Vanessa Narciso Hidalgo 2020*/

const express = require ('express')
const router = express.Router()
const restaurant = require('./controllers/restaurant.js')

//Routes 

router.get('/restaurants', restaurant.getRestaurants);
router.post('/restaurants', restaurant.createRestaurant);

router.get('/restaurants/statistics', restaurant.statistics);

router.get('/restaurants/:id', restaurant.getRestaurant);
router.put('/restaurants/:id', restaurant.updateRestaurant);
router.delete('/restaurants/:id', restaurant.deleteRestaurant);


//Start routes 
router.get('/', (req, res) => {
	res.send('MELP API try /restaurants /restaurants/statistics /restaurants/id ');
})

router.get('*', (req, res) => {
	res.send('MELP API try /restaurants /restaurants/statistics /restaurants/id ');
})

module.exports = router