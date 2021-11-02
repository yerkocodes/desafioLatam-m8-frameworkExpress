const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static('public'));

router.get('/', (req, res) => {
  const currentFile = path.join(__dirname, '../public/index.html');
  res.sendFile(currentFile);
});

//router.get('/imagen', (req, res) => {
  //const currentFile = path.join(__dirname, '../public/collage.html');
  //res.sendFile(currentFile);
//})

router.post('/imagen', (req, res) => {
  const imagen = req.files.target_file;
  const { posicion } = req.body;
  const rutaImg = path.join(__dirname, '../imagenes')

  const currentFile = path.join(__dirname, '../public/collage.html');

  imagen.mv(`${rutaImg}/${imagen.name}`, (err) => {
    err ? res.send(`Lo sentimos pero no se pudo ejecurar la peticion. ${err.message}.`) : res.sendFile(currentFile);
  });
});

module.exports = router;
