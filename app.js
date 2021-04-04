const express = require('express');
const date = require(__dirname + '/date.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const inputItems = ['Food to buy', 'Things Want To Do', 'Thingd To Do'];
const workItems = [];

app.get('/', (req, res) => {

  const day = date.getDate();
  res.render('list', { listTitle: day, newListItems: inputItems });

});

app.get('/work', (req, res) => {

  res.render('list', { listTitle: 'Work List', newListItems: workItems});

});

app.get('/about', (req, res) => {
  res.render('about');
})

app.post('/', (req, res) => {
  
  const currentItem = req.body.newItem;
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