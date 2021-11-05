const express = require('express');
const router = require('express').Router();
const controllerSkaters = require('../controllers/skaters');
const path = require('path');

const expressFileUpload = require('express-fileupload');

router.use(expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
}));


router.use(express.static('public'));

//Middleware CSS file.
router.use('/css', express.static(path.join(__dirname, '../public/assets/css')));

//Middleware Img file.
router.use('/img', express.static(path.join(__dirname, '../imgProfileUsers')));

//Middleware Script file.
router.use('/script', express.static(path.join(__dirname, '../public/assets/js')));

router.get('/', controllerSkaters.getSkatersHome)

router.get('/login', (req, res) => {
  res.render('login', {
    layout: 'login'
  });
});

router.get('/registro', (req, res) => {
  res.render('registro', {
    layout: 'registro',
  });
});

router.post('/registro', controllerSkaters.postSkater);

router.get('/admin', controllerSkaters.getSkatersAdmin);

router.put('/checkAuth', controllerSkaters.skaterStatusChange);

router.get('/datos', (req, res) => {
  res.render('datos', {
    layout: 'datos'
  });
});

router.post('/authLogin', controllerSkaters.skaterAuthLogin);

router.get('/authLogin/:jwt', controllerSkaters.skaterAproved);

router.put('/updateSkater', controllerSkaters.updateSkater);

router.delete('/deleteSkater/:id', controllerSkaters.deleteSkater);

module.exports = router;
