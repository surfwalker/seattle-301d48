'use strict';

const express = require('express');

const app = express();

// Use this as a talking point about environment variables
const PORT = process.env.PORT || 3000;

// Set the view engine for templating
app.set('view engine', 'ejs');

// Array of groceries for /list route
const list = ['apples', 'celery', 'butter', 'milk', 'eggs'];

// Array of quantities for /details route
const quantities = [
  {name: 'apples', quantity: 4},
  {name: 'celery', quantity: 1},
  {name: 'butter', quantity: 1},
  {name: 'milk', quantity: 2},
  {name: 'eggs', quantity: 12}
]

const ejsContext ={arrayOfItems: list};

// Routes
app.get('/', (request, response) => {
  response.render('index', { message : 'Woohoo'});
})

app.get('/list', (request, response) => {
  response.render('list', ejsContext);
})

app.get('/quantities', (request, response) => {
  response.render('quantities', {groceryObjects: quantities});
})


app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
