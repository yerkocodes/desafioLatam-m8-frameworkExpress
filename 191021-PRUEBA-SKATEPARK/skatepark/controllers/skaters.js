const pool = require('../db/init').getPoolInstance();
const path = require('path');
const jsonWebToken = require('jsonwebtoken');
const secretkey = 'pacallao';

module.exports = {
  getSkatersHome: ( req, res ) => {
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

  getSkatersAdmin: ( req, res ) => {
    pool.connect(async ( err_connect, client, release ) => {
      const SQLQuery = {
        text: `select * from skaters;`,
        values: [],
      };
      try {
        const response = await client.query(SQLQuery);
        const skaters = response.rows;
        //console.log(skaters);

        res.render('admin', {
          layout: 'admin',
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
        const response = await client.query(SQLQuery);
        const imagen = req.files.foto;
        const imgPath = path.join(__dirname, '../imgProfileUsers');
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

  skaterStatusChange: (req, res) => {
    //console.log(req.body);
    const { id, check } = req.body;

    pool.connect(async ( err_connect, client, release ) => {
      const SQLQuery = {
        text: `update skaters set estado = $1 where id = $2 returning *;`,
        values: [ check, id ],
      };
      try {
        const response = await client.query(SQLQuery);
        //res.end(JSON.stringify(response));
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };
    })
  },

  skaterAuthLogin: (req, res) => {
    const { email, password } = req.body

    pool.connect(async ( err_connect, client, release ) => {
      const SQLQuery = {
        text: `select * from skaters where email = $1 and password = $2;`,
        values: [ email, password ],
      };
      try {
        const response = await client.query(SQLQuery);
        //console.log(response);
        if ( response.rows[0] ) {
          const token = jsonWebToken.sign({
            data: response.rows[0],
          }, secretkey, { expiresIn: '5m' }); // Expires in 5 minutes.
          res.send(token);
        } 
        else {
          res.send(false);
        };
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };
    });
  },

  skaterAproved: async (req, res) => {
    const { token } = req.query;
    try {
      jsonWebToken.verify(token, secretkey, ( err, data ) => {
        res.render('datos', {
          layout: 'datos',
          dataUser: data.data,
        });
      });
    } catch ( err ) {
      res.redirect('/login');
      console.log(err.message);
    };
  },

  updateSkater: (req, res) => {
    const { id, name, pass, passTwo, experience, specialty } = req.body;

    pool.connect( async ( err_connect, client, release ) => {
      const SQLQuery = {
        text: `update skaters set nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4 where id = $5 returning *;`,
        values: [ name, pass, experience, specialty, id ],
      };
      try {
        const response = await client.query(SQLQuery);
        //console.log(response.rows);
        res.send(response);
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };
    });
  },

  deleteSkater: (req, res) => {
    const { id } = req.params
    console.log(id);
    pool.connect(async (err_connect, client, release) => {
      const SQLQuery = {
        text: `delete from skaters where id = $1 returning *;`,
        values: [ id ],
      };

      try {
        const response = await client.query(SQLQuery);
        res.send(response);
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };
    });
  },
};
