import './App.css';
import * as BooksAPI from './BooksAPI';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Shelfs from './Shelfs';
import Search from './Search';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
      console.log('RESPONSE: ', res);
    };
    getBooks();
  }, []);

  // UPDATE THE SHELFS WITH INITIAL STATE

  const [booksInShelfs, setBooksInShelfs] = useState([]);

  useEffect(() => {
    initBooksState();
    console.log('DENTRO DE USEEFFECT');
  }, [books]);

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

  // UPDATE THE SHELF WITH USER SELECTION
  const onBookStateChange = async (bookID, bookShelf) => {
    console.log(
      'bookID inside UPDATE: ',
      bookID,
      'bookShelf inside UPDATE: ',
      bookShelf
    );
    const myBook = books.find((item) => item.id === bookID);
    console.log(myBook);
    const res = await BooksAPI.update(myBook, bookShelf);
    setBooksInShelfs(res);
    console.log(res);
  };

  const [booksToShow, setBooksToShow] = useState ([]);

  const searchBook = async (query, maxResults) => {
    const res = await BooksAPI.search(query, maxResults);
    console.log("RESULTADO DE SEARCH: ", res);
    return setBooksToShow(res);
  };

/*   contacts.filter((c) =>
  c.name.toLowerCase().includes(query.toLowerCase())
); */

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
        element={<Search booksToShow={booksToShow} searchBook={searchBook} />}
      />
    </Routes>
  );
}

export default App;
