const express = require('express');
const app = express();
const expressFileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const routesFile = require('./routes/routes');

app.listen(PORT, () => {
  console.log(`Listen server on port ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use( expressFileUpload({
  limit: 5000000,
  abortOnLimit: true,
  responseOnLimit: 'El peso del archivo que intentas subir es mayor al limite permitido.',
}) );

app.use(routesFile);
