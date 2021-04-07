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

const listSchema = mongoose.Schema({
  name: String,
  items: [itemsSchema]
});

const List = mongoose.model('List', listSchema);

app.get('/', (req, res) => {

  Item.find({}, (err, result) => {

    if (result.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log('There is en error occured --->', err);
        } else {
          console.log('Inserted To Database Successfully!');
        }
      });
      res.redirect('/');
    } else {
      res.render('list', { listTitle: 'Today', newListItems: result });
    }

  });

});

app.get('/about', (req, res) => { res.render('about'); });

app.post('/', (req, res) => {

  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName
  });

  item.save();
  res.redirect('/');

});

app.post('/delete', (req, res) => {

  const checkedItemID = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemID, (err) => {
    if (err) {
      console.log('Error ocurrs --->', err);
    } else {
      console.log('Deleted Successfully!');
      res.redirect('/');
    }
  });

});

app.get('/:customListName', (req, res) => {

  const customListName = req.params.customListName;

  List.findOne({name: customListName}, (err, result) => {
    if (!err) {
      if (!result) {

        const list = new List({
          name: customListName,
          items: defaultItems
        })
        // list.save();
        // res.redirect('/' + customListName);
        list.save(() => res.redirect('/' + customListName));
      } else {
        res.render('list', { listTitle: result.name, newListItems: result.items });
      }
    }
  });
});

app.listen(3000, () => {
  console.log('Listening port 3000 now---');
});