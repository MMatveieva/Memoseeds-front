const express = require('express');
const cors = require('cors');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
app.use(cors());
app.use(serveStatic(__dirname + "/dist"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port ' + port)
});
