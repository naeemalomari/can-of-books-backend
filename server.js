'use strict';

const mongoose= require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
// const Model = require('./Model')

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
// http://localhost:3001/book
mongoose.connect('mongodb://localhost:27017/book_db', {useNewUrlParser: true, useUnifiedTopology: true});

const booksSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  Image: String,
  email : String,
});

const Book = mongoose.model('Book', booksSchema);

function seedBooksCollections() {

const javaScript =new Book({
  title: 'JavaScript',
  description: 'useful book to study javascript language',
  status: 'Educational Book ',
  image:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/old-books-arranged-on-shelf-royalty-free-image-1572384534.jpg?crop=0.668xw:1.00xh;0,0&resize=480:*',
  email : 'naeemalomari96@gmail.com',
});

const html =new Book({
  title: 'HTML book',
  description: 'useful book to study HTML language',
  status: 'Educational Book ',
  image:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/old-books-arranged-on-shelf-royalty-free-image-1572384534.jpg?crop=0.668xw:1.00xh;0,0&resize=480:*',
  email : 'naeemalomari96@gmail.com',
});

const css =new Book({
  title: 'CSS',
  description: 'useful book to study CSS language',
  status: 'Educational Book ',
  image:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/old-books-arranged-on-shelf-royalty-free-image-1572384534.jpg?crop=0.668xw:1.00xh;0,0&resize=480:*',
  email : 'naeemalomari96@gmail.com',
});



javaScript.save();
html.save();
css.save();

}

// seedBooksCollection();


//http://localhost:3001/book
app.get('/book',getBookHandler);

function getBookHandler(request,response ) {

Book.find(function(err,bookArray){

if(err) {

  console.log('Error')
}else {

  console.log(bookArray);
  response.send(bookArray);
}


})

}
app.get('/test', (request, response) => {

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));


