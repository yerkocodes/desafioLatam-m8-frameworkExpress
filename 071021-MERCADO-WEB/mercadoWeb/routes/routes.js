const router = require('express').Router();

const shoppingCart = require('../controllers/shoppingCart');

router.route('/')
  .get((req, res) => {
    res.render('Inicio', {
      layout: 'Inicio',
      productos: [ 'banana', 'cebollas', 'lechuga', 'papas', 'pimenton', 'tomate' ],
    });
  });

router.route('/modal/:producto')
  .get(shoppingCart.addCart)

router.route('/modal')
  .get(shoppingCart.getCart)

module.exports = router;
