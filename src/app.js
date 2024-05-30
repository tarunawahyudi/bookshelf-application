import Book from '../src/model/Book.js';
import BookManager from '../src/repository/BookRepository.js';
import UI from '../src/view/display.js';

document.addEventListener('DOMContentLoaded', UI.displayBooks);

const inputBookForm = document.getElementById('inputBook');
const inputBookIsComplete = document.getElementById('inputBookIsComplete');
const bookSubmitSpan = document.getElementById('bookSubmitSpan');

inputBookIsComplete.addEventListener('change', function() {
  if (inputBookIsComplete.checked) {
    bookSubmitSpan.textContent = 'Selesai dibaca';
  } else {
    bookSubmitSpan.textContent = 'Belum selesai dibaca';
  }
});

inputBookForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const title = document.querySelector('#inputBookTitle').value;
  const author = document.querySelector('#inputBookAuthor').value;
  const year = document.querySelector('#inputBookYear').value;
  const isComplete = document.querySelector('#inputBookIsComplete').checked;

  const book = new Book(+new Date(), title, author, year, isComplete);
  const bookManager = new BookManager();
  bookManager.addBook(book);
  UI.addBookToList(book);
  inputBookForm.reset();
  bookSubmitSpan.textContent = 'Belum selesai dibaca';
});

document.getElementById('searchBook').addEventListener('submit', function(event) {
  event.preventDefault();
  const searchTitle = document.querySelector('#searchBookTitle').value.toLowerCase();
  UI.searchBooks(searchTitle);
});
