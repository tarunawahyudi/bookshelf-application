import BookRepository from '../repository/BookRepository.js';

class UI {
  static displayBooks() {
    const bookManager = new BookRepository();
    bookManager.books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = book.isComplete ? document.querySelector('#completeBookshelfList') : document.querySelector('#incompleteBookshelfList');
    const bookElement = document.createElement('article');
    bookElement.classList.add('book_item', 'bg-white', 'p-4', 'rounded', 'shadow-md');
    bookElement.setAttribute('data-id', book.id);
    bookElement.innerHTML = `
      <h3 class="text-lg font-semibold">${book.title}</h3>
      <p class="text-gray-700">Penulis: ${book.author}</p>
      <p class="text-gray-700">Tahun: ${book.year}</p>
      <div class="action mt-4">
        <button class="green bg-green-500 text-white px-4 py-2 rounded mr-2">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
        <button class="red remove bg-red-500 text-white px-4 py-2 rounded">Hapus buku</button>
      </div>
    `;

    bookElement.querySelector('.remove').addEventListener('click', function() {
      UI.removeBook(book.id);
    });

    bookElement.querySelector('.green').addEventListener('click', function() {
      UI.toggleBookComplete(book.id);
    });

    list.appendChild(bookElement);
  }

  static removeBook(id) {
    const bookManager = new BookRepository();
    bookManager.removeBook(id);
    document.querySelector(`[data-id='${id}']`).remove();
  }

  static toggleBookComplete(id) {
    const bookManager = new BookRepository();
    bookManager.toggleBookComplete(id);
    document.querySelector(`[data-id='${id}']`).remove();
    const book = bookManager.books.find(book => book.id === id);
    UI.addBookToList(book);
  }

  static clearList() {
    document.querySelector('#incompleteBookshelfList').innerHTML = '';
    document.querySelector('#completeBookshelfList').innerHTML = '';
  }

  static searchBooks(title) {
    const bookManager = new BookRepository();
    const filteredBooks = bookManager.searchBooks(title);
    UI.clearList();
    filteredBooks.forEach(book => UI.addBookToList(book));
  }
}

export default UI;
