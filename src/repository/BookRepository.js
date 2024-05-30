class BookRepository {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  addBook(book) {
    this.books.push(book);
    this.saveBooks();
  }

  removeBook(id) {
    this.books = this.books.filter(book => book.id !== id);
    this.saveBooks();
  }

  toggleBookComplete(id) {
    const book = this.books.find(book => book.id === id);
    if (book) {
      book.isComplete = !book.isComplete;
      this.saveBooks();
    }
  }

  searchBooks(title) {
    return this.books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }
}

export default BookRepository;
