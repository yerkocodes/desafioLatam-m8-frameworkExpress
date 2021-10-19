const express = require('express');
const app = express();
const expressHandlebars = require('express-handlebars');
const PORT = process.env.PORT || 3000;

//Servidor a la escucha.
app.listen(PORT, () => {
  console.log('Listening server on port: ' + PORT);
});

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

//Middleware Jquery.
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

app.use('/images', express.static(__dirname + '/public/img'));

app.get('/', (req, res) => {
  res.render('Inicio', {
    layout: 'Inicio',
    productos: [ 'banana', 'cebollas', 'lechuga', 'papas', 'pimenton', 'tomate' ],
  });
});
