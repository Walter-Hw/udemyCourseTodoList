const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.set('view engine', 'ejs');

let inputItems = ['Food to buy', 'Things Want To Do', 'Thingd To Do'];

app.get('/', (req, res) => {

  let today = new Date();
  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }

  let day = today.toLocaleDateString('en-US', options);
  res.render('list', { kindOfDay: day, newListItems: inputItems });

});

app.post('/', (req, res) => {
  
  inputItems.push(req.body.newItem);
  res.redirect('/');

});

app.listen(3000, () => {
  console.log('Listening port 3000 now---');
});