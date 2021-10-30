const pool = require('../db/init').getPoolInstance();

module.exports = {

  getCart: (req, res) => {
    pool.connect( async ( err_connect, client, release ) => {
      if( err_connect ) {
        console.log(err_connect);
      };

      const SQLQuery = {
        text: 'select * from shoppingcart',
        values: [],
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

  addCart: (req, res) => {
    const { producto } = req.params;
    //console.log(producto);

    pool.connect(async ( err_connect, client, release ) => {

      console.log('Entrando en addCart con POST method. ' + producto);

      if ( err_connect ) {
        console.log(err_connect);
      };

      const SQLQuery = {
        text: 'insert into shoppingcart (product) values ($1) returning *;',
        values: [ producto ],
      };

      try {
        //console.log(SQLQuery);
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
