const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('OK!');
});

routerApi(app);

app.listen(port, () => {
  console.log(`App listening in ${port}`);
});
