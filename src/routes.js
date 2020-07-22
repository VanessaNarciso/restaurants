/* Vanessa Narciso Hidalgo 2020*/

const express = require ('express')
const router = express.Router()
const restaurant = require('./controllers/restaurant.js')

//Route

router.get('/restaurants', restaurant.getRestaurants);
router.post('/restaurants', restaurant.createRestaurant);
router.get('/restaurants/:id', restaurant.getRestaurant);
router.put('/restaurants/:id', restaurant.updateRestaurant);
router.delete('/restaurants/:id', restaurant.deleteRestaurant);


router.get('/', (req, res) => {
	res.send('MELP API');
})

module.exports = router