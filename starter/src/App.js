import './App.css';
import * as BooksAPI from './BooksAPI';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Shelfs from './Shelfs';
import Search from './Search';

function App() {
  const [books, setBooks] = useState([]);
  const [booksInShelfs, setBooksInShelfs] = useState([]);
  const [booksToShow, setBooksToShow] = useState([]);

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

  const searchBook = async (query, maxResults) => {
    const res = await BooksAPI.search(query, maxResults);
    if (query === '') {
      setBooksToShow([]);
    } else if (res.error === 'empty query') {
      console.log('EMPTY QUERY!!: ', res);
      setBooksToShow([]);
    } else {
      console.log('BOOKSTOSHOW: ', booksToShow);
      giveShelfsToSearch(res);
    }
  };

  const giveShelfsToSearch = (res) => {
    for (let bookFromSearch of res) {
      console.log('bookFromSearch', bookFromSearch);
      findIDInBooksInShelfs(bookFromSearch, res)
    };

    console.log('RESULTADOAQUI: ', res)
    setBooksToShow(res);
  };
    
  // shelf: STRING currentlyReading, wantToRead, read
  // ids: ARRAY of books inside shelfs
  // id: STRING of unique ID of the book
  // bookFromSearch_ID: ID of the book to find

  const findIDInBooksInShelfs = (bookFromSearch, res) => {
    console.log('booksInShelfs: ', booksInShelfs);
    Object.entries(booksInShelfs).map(([shelf, ids]) => (
      ids.map (id => {
      console.log('id y bookFromSearch.id, KEY', id , ' / ', bookFromSearch.id, ' / ', shelf)
        if ((id !== bookFromSearch.id) && !(bookFromSearch.hasOwnProperty(shelf))) {
          console.log("NO IGUALES!", shelf)
          bookFromSearch.shelf = 'none';
        } else {
          console.log("IGUALES!", shelf)
          setBooksToShow([...res], bookFromSearch.shelf = shelf);
        }
        })))

  }

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
            setBooksToShow={setBooksToShow}
            booksToShow={booksToShow}
            searchBook={searchBook}
            booksInShelfs={booksInShelfs}
            onBookStateChange={onBookStateChange}
          />
        }
      />
    </Routes>
  );
}

export default App;
