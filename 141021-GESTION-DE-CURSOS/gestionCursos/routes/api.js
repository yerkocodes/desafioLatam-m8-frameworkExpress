const express = require('express');
const router = express.Router();
const path = require('path');

const cursoController = require('../controllers/curso');

router.use(express.static('public'));

router.get('/', (req, res) => {
  const indexFile = path.join(__dirname, '../public/index.html');
  res.sendFile(indexFile);
});

router.post('/curso', cursoController.postCurso);

router.get('/cursos', cursoController.getCursos);

router.put('/curso/:idCurso', cursoController.putCurso);

router.delete('/curso/:idCurso', cursoController.deleteCursos);

module.exports = router;
