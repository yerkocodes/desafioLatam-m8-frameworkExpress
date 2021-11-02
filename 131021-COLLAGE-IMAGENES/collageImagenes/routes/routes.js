const express = require('express');
const router = express.Router();
const path = require('path');
const { unlink } = require('fs');

router.use(express.static('public'));

router.get('/', (req, res) => {
  const currentFile = path.join(__dirname, '../public/index.html');
  res.sendFile(currentFile);
});

router.get('/imagen', (req, res) => {
  const collageFile = path.join(__dirname, '../public/collage.html');
  res.sendFile(collageFile);
})

router.post('/imagen', (req, res) => {
  const imagen = req.files.target_file;
  const { posicion } = req.body;
  const rutaImg = path.join(__dirname, '../public/assets/imgs');

  //console.log(posicion);
  imagen.mv(`${rutaImg}/imagen-${posicion}.jpg`, (err) => {
    err ? res.send(`Lo sentimos pero no se pudo ejecurar la peticion. ${err.message}.`) : res.redirect('/imagen');
  });
});

router.get('/deleteImg/:imagen', (req, res) => {
  const { imagen } = req.params;
  const rutaImg = path.join(__dirname, '../public/assets/imgs');
  unlink(`${rutaImg}/${imagen}`, (err) => {
    //err ? console.log('Ocurrio un error y no se pudo eliminar la foto.') : res.redirect('/imagen') ;
    err ? res.send(`<h1>No se pudo eliminar la foto.</h1> <br> <button><a href="/">Volver a inicio</a></button>`) : res.redirect('/imagen') ;
  });
});

module.exports = router;
