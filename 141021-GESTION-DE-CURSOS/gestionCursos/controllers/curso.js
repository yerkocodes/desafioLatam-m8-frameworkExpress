const pool = require('../db/init').getPoolInstance();

module.exports = {

  getCursos: (req, res) => {
    pool.connect( async ( err_connect, client, release ) => {
      if ( err_connect ) {
        console.log(err_connect);
      };

      const SQLQuery = {
        text: `select * from cursos;`,
        values: [],
      };

      try {
        const response = await client.query(SQLQuery);
        //console.log(JSON.stringify(response));
        res.end(JSON.stringify(response.rows));
        //console.log(response.rows)
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };
    });
  },

  postCurso: (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;

    pool.connect( async ( err_connect, client, release ) => {
      if ( err_connect ) {
        console.log(err_connect);
      };

      const SQLQuery = {
        text: `insert into cursos ( nombre, nivel, fecha, duracion ) values ( $1, $2, $3, $4 ) returning *;`,
        values: [ nombre, nivelTecnico, fechaInicio, duracion ],
      };

      try {
        const response = await client.query(SQLQuery);
        console.log(response.rows);
        res.end(JSON.stringify(response));
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };
    });
  },

  putCurso: (req, res) => {

    pool.connect( async ( err_connect, client, release ) => {
      if ( err_connect ) {
        console.log(err_connect);
      };

      const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
      const idCurso = req.params.idCurso;

      const SQLQuery = {
        text: `update cursos set nombre = $1, nivel = $2, fecha = $3, duracion = $4 where id = $5 returning *;`,
        values: [ nombre, nivelTecnico, fechaInicio, duracion, idCurso ],
      };

      try {
        const response = await client.query(SQLQuery);
        res.end(JSON.stringify(response));
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };
    });

  },

  deleteCursos: (req, res) => {
    pool.connect( async ( err_connect, client, release ) => {
      if ( err_connect ) {
        console.log(err_connect);
      };

      const idCurso = req.params.idCurso;

      const SQLQuery = {
        text: `delete from cursos where id = $1 returning *`,
        values: [ idCurso ],
      };

      try {
        const response = await client.query(SQLQuery);
        res.end(JSON.stringify(response));
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };
    });

  },

};
