'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
// const Model = require('./Model')
const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3001;
// http://localhost:3001/book
// mongoose.connect('mongodb://localhost:27017/book', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });

const booksSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  Image: String,
  email: String,
});

const librarySchema = new mongoose.Schema({
  library: String,
  books: [booksSchema]
});

const Book = mongoose.model('Book', booksSchema);
const libraryModel = mongoose.model('library', librarySchema);

function seedBooksCollections() {

  const javaScript = new Book({
    title: 'JavaScript Book',
    description: 'useful book to study javascript language',
    status: 'Educational Book ',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/old-books-arranged-on-shelf-royalty-free-image-1572384534.jpg?crop=0.668xw:1.00xh;0,0&resize=480:*',
    email: 'naeemalomari96@gmail.com',
  });

  const html = new Book({
    title: 'HTML Book',
    description: 'useful book to study HTML language',
    status: 'Educational Book ',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/old-books-arranged-on-shelf-royalty-free-image-1572384534.jpg?crop=0.668xw:1.00xh;0,0&resize=480:*',
    email: 'naeemalomari96@gmail.com',
  });

  const css = new Book({
    title: 'CSS Book ',
    description: 'useful book to study CSS language',
    status: 'Educational Book ',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/old-books-arranged-on-shelf-royalty-free-image-1572384534.jpg?crop=0.668xw:1.00xh;0,0&resize=480:*',
    email: 'naeemalomari96@gmail.com',
  });

  javaScript.save();
  html.save();
  css.save();

}

// seedBooksCollection();
// seedBooksCollections()

// function seedLibraryCollection() {

//   const library = new libraryModel({
//     libraryName: 'Programming',
//     books: [
//       {
//         title: 'JavaScript Book',
//         description: 'useful book to study javascript language',
//         status: 'Educational Book ',
//       },
//       {
//         title: 'HTML Book',
//         description: 'useful book to study HTML language',
//         status: 'Educational Book ',
//       }
//     ]
//   });

//   const library2 = new libraryModel({
//     libraryName: 'Engineering',
//     books: [
//     {
//       title: 'reinforcement concrete ||  Book ',
//       description: 'useful in civil engineering field',
//       status: 'Educational Book ',
//     }
//     ]
//   })
// library.save();
// library2.save();
// }
// seedLibraryCollection();

//http://localhost:3001/book
app.get('/book', getBookHandler);

function getBookHandler(request, response) {
  Book.find(function (err, bookArray) {
    if (err) {
      console.log('Error')
    } else {
      console.log(bookArray);
      response.send(bookArray);
    }
  })
}

//http://localhost:3001/books
app.post('/books', getBooksHandler);
function getBooksHandler(req,res) {
const {email,title,description, status}=req.body;
Book.find({email:email},(err,resultBooks)=> {
  if (resultBooks.length == 0) {
    // res.status(404).send("cant find any user");
    const newObj = {
      title: title,
      description: description,
      status: status,
      email: email,
    };
    resultBooks.push(newObj);
    let bookArr = resultBooks.map((i) => {
      return new BooksSaver(i);
    });
    res.send(bookArr);
    Book.insertMany(newObj);
  } else {
    const newObj = {
      title: title,
      description: description,
      status: status,
      email: email,
    };
    resultBooks.push(newObj);
    let bookArr = resultBooks.map((i) => {
      return new BooksSaver(i);
    });
    res.send(bookArr);
    Book.insertMany(newObj);
  }

});
}
class BooksSaver {
  constructor(i) {
    this.title = i.title;
    this.description = i.description;
    this.status = i.status;
  }
}
app.delete("/books/:idx", deleteBook);

//http://localhost:3001/books/1
function deleteBook(req, res) {
  const idx = req.params.idx;
  const email = req.query.email;
// console.log(req.params)
  Book.findOne({ email: email, idx: idx });
  Book.filter({ email: email }, (err, result) => {
    if (result.length == 0 || err) {
      res.status(404).send("Error check it ");
    } else {
      res.send(result.data);
            // result.data.save();
    }
  });
}


//http://localhost:3001/books/1
app.put('/updateBooks/:idx',updateBook)

function updateBook (req,res) {

  const { email, title, description, status } = req.body;
  const id = req.params.idx;
  console.log(typeof idx);

   Book.updateOne(
    { idx: idx },
    { title: title, description: description, status: status, email: email }
  );

  Book.find({ idx: idx }, (err, result) => {
    if (err) {
      res.send(500, "Book Not Found");
    } else {
      res.send(result);
    }
  });

}


app.listen(PORT, () => console.log(`listening on ${PORT}`));


