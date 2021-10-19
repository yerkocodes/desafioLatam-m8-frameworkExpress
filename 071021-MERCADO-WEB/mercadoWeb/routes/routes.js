const router = require('express').Router();

const shopping = require('../controllers/shopping');
const shoppingCart = require('../controllers/shoppingCart');

//console.log(router)

router.route('/')
  .get((req, res) => {
    res.render('Inicio', {
      layout: 'Inicio',
      productos: [ 'banana', 'cebollas', 'lechuga', 'papas', 'pimenton', 'tomate' ],
    });
  });

module.exports = router;
