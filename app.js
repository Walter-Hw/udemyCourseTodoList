const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

  let today = new Date();
  let day = '';

  if (today.getDay() === 6 || today.getDay() === 0) {
    day = 'Weekend HaHa!';
  } else {
    day = 'Weekday OhHa';
  }

  res.render('list', { kindOfDay: day });

});

app.listen(3000, () => {
  console.log('Listening port 3000 now---');
});