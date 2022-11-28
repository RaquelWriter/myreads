import './App.css';
import * as BooksAPI from './BooksAPI';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Shelfs from './Shelfs';
import Search from './Search';

function App() {
  const [books, setBooks] = useState([]);
  const [booksInShelfs, setBooksInShelfs] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
      console.log('RESPONSE: ', res);
    };
    getBooks();
  }, []);

  // UPDATE THE SHELFS WITH INITIAL STATE
  useEffect(() => {
    const initBooksState = () => {
      const currentlyReading = books
        .filter((book) => book.shelf === 'currentlyReading')
        .map((item) => item.id);
      const wantToRead = books
        .filter((book) => book.shelf === 'wantToRead')
        .map((item) => item.id);
      const read = books
        .filter((book) => book.shelf === 'read')
        .map((item) => item.id);
      setBooksInShelfs({
        currentlyReading: currentlyReading,
        wantToRead: wantToRead,
        read: read,
      });
    };
    initBooksState();
  }, [books]);

  // UPDATE THE SHELF WITH USER SELECTION
  // Called from BookShelfChanger.js
  const onBookStateChange = async (bookID, bookShelf, completeBook) => {
    console.log(
      'bookID inside UPDATE: ',
      bookID,
      'bookShelf inside UPDATE: ',
      bookShelf,
      'completebook inside UPDATE: ',
      completeBook
    );
    const myBook = books.find((item) => item.id === bookID);
    if (myBook) {
      const res = await BooksAPI.update(myBook, bookShelf);
      setBooksInShelfs(res);
      console.log(res);
    } else {
      completeBook.shelf = bookShelf;
      setBooks([...books, completeBook]);
      setBooksInShelfs([books]);
    }
  };

  return (
    <Routes>
      <Route
        exact
        path='/'
        element={
          <Shelfs
            books={books}
            booksInShelfs={booksInShelfs}
            onBookStateChange={onBookStateChange}
          />
        }
      />
      <Route
        path='/search'
        element={
          <Search
            books={books}
            booksInShelfs={booksInShelfs}
            onBookStateChange={onBookStateChange}
          />
        }
      />
    </Routes>
  );
}

export default App;
