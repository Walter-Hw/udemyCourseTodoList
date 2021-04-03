const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

app.get('/', (req, res) => {
  res.send('<h1>Hi! This is a initial page!</h1>');
});

app.listen(3000, () => {
  console.log('Listening port 3000 now---');
});