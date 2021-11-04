const pool = require('../db/init').getPoolInstance();
const path = require('path');

module.exports = {
  getSkaters: ( req, res ) => {
    pool.connect(async ( err_connect, client, release ) => {
      const SQLQuery = {
        text: `select * from skaters;`,
        values: [],
      };
      try {
        const response = await client.query(SQLQuery);
        const skaters = response.rows;

        res.render('index', {
          layout: 'index',
          skaters
        });

      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };
    });
  },

  postSkater: (req, res) => {
    const { email, nombre, password, password2, anos, especialidad } = req.body;
    const imageName = req.files.foto.name;

    pool.connect(async ( err_connect, client, release ) => {
      const SQLQuery = {
        text: `insert into skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) values ( $1, $2, $3, $4, $5, $6, $7) returning *;`,
        values: [ email, nombre, password, anos, especialidad, imageName, false],
      };

      try {
        //const response = await client.query(SQLQuery);
        const imagen = req.files.foto;
        const imgPath = path.join(__dirname, '../imgProfileUsers')
        imagen.mv(`${imgPath}/${imagen.name}`, (err) => {
          err ? res.send('No se logro registrar al usuario.') : res.redirect('/');
        });
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };
    });
  },
};
