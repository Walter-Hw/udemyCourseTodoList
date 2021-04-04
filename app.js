const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.set('view engine', 'ejs');
app.use(express.static('public'));

let inputItems = ['Food to buy', 'Things Want To Do', 'Thingd To Do'];
let workItems = [];

app.get('/', (req, res) => {

  let today = new Date();
  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }

  let day = today.toLocaleDateString('en-US', options);
  res.render('list', { listTitle: day, newListItems: inputItems });

});

app.get('/work', (req, res) => {

  res.render('list', { listTitle: 'Work List', newListItems: workItems});
  
});

app.post('/', (req, res) => {
  
  let currentItem = req.body.newItem;
  if (req.body.list === 'Work') {
    workItems.push(currentItem);
    res.redirect('/work');
  } else {
    inputItems.push(currentItem);
    res.redirect('/');
  }

});

app.listen(3000, () => {
  console.log('Listening port 3000 now---');
});