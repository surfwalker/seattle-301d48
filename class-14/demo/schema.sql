DROP TABLE books;

CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  isbn VARCHAR(255),
  image_url VARCHAR(255),
  description TEXT,
  bookshelf VARCHAR(255)
);

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES (
  'Dune',
  'Frank Herbert',
  'ISBN_13 9780441013593',
  'http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  'Follows the adventures.',
  'Fantasy'
);

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES (
  'What Alice Forgot',
  'Liane Moriarty',
  'ISBN_13 1101515376',
  'http://books.google.com/books/content?id=8iBGzeqj45YC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  'Alice Love is twenty-nine',
  'Fiction'
);

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES (
  'Unsouled',
  'Will Wight',
  'ISBN_13 9780989671767',
  'http://books.google.com/books/content?id=OjYJtAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
  'Sacred artists.',
  'SciFi'
);

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES (
  'The Stand',
  'Stephen King',
  'ISBN_13 9780385528856',
  'http://books.google.com/books/content?id=UbfnTcmkaKkC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  'Stephen King''s apocalyptic vision',
  'Drama'
);

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES (
  'Sweet Thursday',
  'John Steinbeck',
  'ISBN_13 978144063549',
  'http://books.google.com/books/content?id=zer-bEoDL-EC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  'In Monterey, on the California coast.',
  'Classics'
);

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES (
  'The New Jim Crow',
  'Michelle Alexander',
  'ISBN_13 9781595588197',
  'http://books.google.com/books/content?id=reDzBZ3pXqsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  'Once in a great while a book comes along.',
  'Culture'
);




