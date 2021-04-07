const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB', { 
  useNewUrlParser:true,
  useUnifiedTopology: true 
});

const itemsSchema = new mongoose.Schema({
  name: String
})
const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
  name: 'Welcome to Your Todo List.'
});
const item2 = new Item({
  name: 'Press the + button to add a new item.'
});
const item3 = new Item({
  name: '<-- Press this button to delete an item.'
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, (err) => {
  if (err) {
    console.log('There is en error occured --->', err);
  } else {
    console.log('Inserted To Database Successfully!');
  }
});

app.get('/', (req, res) => {
  res.render('list', { listTitle: 'Today', newListItems: defaultItems });
});

app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work List', newListItems: defaultItems});
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