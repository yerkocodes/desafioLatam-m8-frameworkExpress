const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const expressHandlebars = require('express-handlebars');

const routeApi = require('./routes/api');

app.listen(PORT, () => console.log(`Listening server on port ${PORT}`));

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//Configuración del motor.
app.engine(
  'handlebars',  // Extensión de los archivos.
  expressHandlebars({
    layoutsDir: __dirname + '/views', // Ruta de los layouts.
    partialsDir: __dirname + '/views/componentes/',  // Ruta de los parciales.
  })
);
//Definir handlebars como motor de vista.
app.set('view engine', 'handlebars');

app.use( routeApi );
