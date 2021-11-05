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
    //console.log(req.body);

    pool.connect(async ( err_connect, client, release ) => {
      const SQLQuery = {
        text: `select * from skaters where email = $1 and password = $2;`,
        values: [ email, password ],
      };
      try {
        const response = await client.query(SQLQuery);
        if ( response.rows[0] ) {
          console.log('bien');
          const token = jsonWebToken.sign({
            exp: Math.floor(Date.now() / 1000) + 120, // expira en 2 minutos.
            data: response.rows[0],
          },
            secretkey
          );
          res.send(token);
        } 
        else {
          res.send('Usuario o contrasenas incorrectas.');
        };
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };
    });
  },

  skaterAproved: (req, res) => {
    const { jwt } = req.params;

    jsonWebToken.verify(jwt, secretkey, ( err, data ) => {
      const dataUser = [];
      dataUser.push(data.data);
      //console.log(data)
      //console.log(dataUser[0]);

      res.render('datos', {
        layout: 'datos',
        dataUser: dataUser[0],
      });

    });
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
