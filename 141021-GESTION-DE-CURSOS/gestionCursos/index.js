const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const routeApi = require('./routes/api');

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log(`Listening server on port ${PORT}`);
});

app.use( routeApi );
