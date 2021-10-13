const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log('Listening server on port: ' + PORT);
});

app.use(express.static('assets'));

app.get('/', (req, res) => {
  res.send(__dirname + '/index.html')
});

app.get('/abracadabra/usuarios', (req, res) => {
  res.send(require(__dirname + '/usuarios.json'))
});

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
  const user = req.params.usuario;
  const data = require(__dirname + '/usuarios.json').usuarios;
  const verify = data.find((element) => {
    return element === user;
  });
  //verify ? next() : res.send('No se encontro el usuario registrado.');
  if ( verify ) {
    req.userOk = true;
    next();
  } else {
    //res.send('No se encontro el usuario registrado.')
    res.sendFile(__dirname + '/assets/img/who.jpeg')
  };
});

app.get('/abracadabra/juego/:usuario', (req, res) => {
  if ( req.userOk ) {
    //console.log(req.params.usuario);
    res.redirect('http://localhost:' + PORT + '/');
  };
});

app.get('/abracadabra/conejo/:n', (req, res) => {
  const numberParams = req.params.n;
  const randomNumber = Math.floor(Math.random() * 4) + 1;
  console.log('NumberParams: ' + numberParams + ' - ' + 'RandomNumber: ' + randomNumber);
  res.sendFile( numberParams == randomNumber ? __dirname + '/assets/img/conejito.jpg' : __dirname + '/assets/img/voldemort.jpg' );
});

app.get('*', (req, res) => {
  res.send('Esta página no existe.');
});
