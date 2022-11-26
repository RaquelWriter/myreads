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

  const [booksToShow, setBooksToShow] = useState([]);

  const searchBook = async (query, maxResults) => {
    const res = await BooksAPI.search(query, maxResults);
    if (query === '') {
      setBooksToShow([]);
    } else if (res.error === 'empty query') {
      console.log('EMPTY QUERY!!: ', res);
      setBooksToShow([]);
    } else {
      console.log('BOOKSTOSHOW: ', booksToShow);
      prepareBooksToShow(res);
    }
  };

  const prepareBooksToShow = (res) => {
    /*     Object.values(booksInShelfs)
      .map((bookFromShelf) => bookFromShelf.id)
      .find((id) => id === Object.values(res).map((resBook) => resBook.id))
      ? getShelf(res)
      : setBooksToShow({ ...res, shelf: 'none' }); */
    /*     Object.keys(booksInShelfs).map(
      (bookFromShelf) =>
        bookFromShelf.id ===
        Object.values(res).map((resBook) =>
          resBook.id ? getShelf(res) : setBooksToShow({ ...res, shelf: 'none' })
        )
    ); */
    
      Object.keys(res).map(
        (bookFromSearch) =>
          bookFromSearch.id ===
          Object.values(booksInShelfs).map((bookFromShelf) =>
            bookFromShelf.id ? getShelf(res) : res[bookFromSearch].shelf = 'none'
          )
      )
      setBooksToShow(res);
  };

  /* 
  shelfBooks.map((shelfBook) =>
    shelfBook.id === book.id ? { ...shelfBook, shelf: newShelf } : shelfBook
  );
 */
  const getShelf = (res) => {
    let shelf = Object.values(booksInShelfs)
      .map((item) => item.shelf)
      .find((shelf) => shelf);
    setBooksToShow({ ...res, shelf: shelf });
  };

  // FIND THE SHELF IN booksInShelf
  // Return the shelf
  // If found include it, if not set to None shelf

  // SHELF DISTRIBUTION FOR THE BOOKS IN SEARCH
  /*   const [shelfForBookOnSearch, setShelfForBookOnSearch] = useState('');

    const findShelf = (bookIDFromSearch) => {
      Object.values(booksInShelfs)
        .map((bookFromShelf) => bookFromShelf.id)
        .find((id) => id === bookIDFromSearch) &&
        getShelf()
    };
    const getShelf = () => {
      let shelf = Object.values(booksInShelfs)
        .map((item) => item.shelf)
        .find((shelf) => shelf);
      setShelfForBookOnSearch(shelf);
    };


  /* const searchBook = async (query, maxResults) => {
    if (query !== '') {
      const res = await BooksAPI.search(query, maxResults);
      if (res.error === 'empty query') {
        console.log('EMPTY QUERY!!: ', res);
        setBooksToShow([]);
      } else {
        setBooksToShow(res);
      }
    } else {
      setBooksToShow([]);
    }    
  }; */

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
        element={
          <Search
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
