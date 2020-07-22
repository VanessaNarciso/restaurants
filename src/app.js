/* Vanessa Narciso Hidalgo 2020*/

const express = require('express'); 
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;
const router = require('./routes')

const app = express();
app.use(bodyParser.json());

require('./config.js');

app.use(router);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

