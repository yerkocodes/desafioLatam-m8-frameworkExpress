const express = require('express');
const app = express();
const expressHandlebars = require('express-handlebars');
const PORT = process.env.PORT || 3000;
const routesFile = require('./routes/routes');

//Servidor a la escucha.
app.listen(PORT, () => console.log(`Listening server on port: ${PORT}`));

//Definir handlebars como motor de vista.
app.set('view engine', 'handlebars');

//Configuración del motor.
app.engine(
  'handlebars',  // Extensión de los archivos.
  expressHandlebars({
    layoutsDir: __dirname + '/views', // Ruta de los layouts.
    partialsDir: __dirname + '/views/componentes/',  // Ruta de los parciales.
  })
);

//Middleware Bootstrap.
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//Middleware JS BUNDLE Bootstrap.
app.use('/bootstrapbundle', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

//Middleware Jquery.
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

//Middleware Imagenes.
app.use('/images', express.static(__dirname + '/public/img'));

//Middleware Script file.
app.use('/script', express.static(__dirname + '/public/assets/js'))

//Middleware rutas.
app.use(routesFile);
