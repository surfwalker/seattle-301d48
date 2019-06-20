'use strict';
require('dotenv').config();

// Application Dependencies
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

//***** Configure our database */
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Application Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');

// API Routes
app.get('/', getBooks);
app.post('/searches', createSearch);
app.get('/searches/new', newSearch);
app.post('/books', createBook);
app.get('/book/:id', getBook);


app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// HELPER FUNCTIONS
function Book(info) {
  const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';
  let httpRegex = /^(http:\/\/)/g

  this.title = info.title ? info.title : 'No title available';
  this.author = info.authors ? info.authors[0] : 'No author available';
  this.isbn = info.industryIdentifiers ? `ISBN_13 ${info.industryIdentifiers[0].identifier}` : 'No ISBN available';
  this.image_url = info.imageLinks ? info.imageLinks.smallThumbnail.replace(httpRegex, 'https://') : placeholderImage;
  this.description = info.description ? info.description : 'No description available';
  this.id = info.industryIdentifiers ? `${info.industryIdentifiers[0].identifier}` : '';
}

// ******* Retrieves books from DB *******
function getBooks(req, res) {
  let SQL = 'SELECT * FROM "books";';

  return client.query(SQL)
    .then(result => {
      if (result.rowCount === 0) {
        res.render('pages/searches/new');
      } else {
        res.render('pages/index', { books: result.rows });
      }
    })
    .catch(err => handleError(err, res));
}

// ******* Creates a book in our DB *******
function createBook(req, res) {
  let { title, author, isbn, image_url, description, bookshelf } = req.body;
  let SQL = 'INSERT INTO books(title, author, isbn, image_url, description, bookshelf) VALUES($1, $2, $3, $4, $5, $6);';
  let values = [title, author, isbn, image_url, description, bookshelf];

  return client.query(SQL, values)
    .then(() => {
      SQL = 'SELECT * FROM "books" WHERE isbn=$1;';
      values = [req.body.isbn];
      return client.query(SQL, values)
        .then(result => res.redirect(`/book/${result.rows[0].id}`))
        .catch(err => handleError(err, res))
    })
    .catch(err => handleError(err, res));
}

function newSearch(request, response) {
  response.render('pages/searches/new');
}

// ******* Retrieve a single book from DB ********
function getBook(req, res) {
  let SQL = 'SELECT * FROM books where id=$1;';
  let values = [req.params.id];
  return client.query(SQL, values)
    .then(result => res.render('pages/book/show', { book: result.rows[0] }))
    .catch(err => handleError(err, res));
}

function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', { searchResults: results }))
    .catch(err => handleError(err, response));
}

function handleError(error, response) {
  response.render('pages/error', { error: error });
}
