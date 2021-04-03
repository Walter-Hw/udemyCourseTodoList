const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

  let today = new Date();
  let day = '';
  let currentDay = today.getDay();

  if (currentDay === 0) {
    day = 'Sunday';
  }
  if (currentDay === 1) {
    day = 'Monday';
  }
  if (currentDay === 2) {
    day = 'Tuesday';
  }
  if (currentDay === 3) {
    day = 'Wednesday';
  }
  if (currentDay === 4) {
    day = 'Thursday';
  }
  if (currentDay === 5) {
    day = 'Friday';
  }
  if (currentDay === 6) {
    day = 'Saturday';
  }

  res.render('list', { kindOfDay: day });

});

app.listen(3000, () => {
  console.log('Listening port 3000 now---');
});