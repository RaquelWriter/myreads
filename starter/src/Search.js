import { useState, useEffect } from 'react';
import * as BooksAPI from './BooksAPI';
import BookShelfChanger from './BookShelfChanger';
import useDebounce from './useDebounce';
import { Link } from 'react-router-dom';

function Search({ onBookStateChange, booksInShelfs }) {
  const [query, setQuery] = useState('');
  const debouncedVal = useDebounce(query, 500);
  const [booksToShow, setBooksToShow] = useState([]);

  const updateQuery = (e) => {
    setQuery(e.target.value.trim());
  };

  useEffect(() => {
    if (!debouncedVal) {
      setBooksToShow([]);
    } else {
      searchBook(query, 20);
    }
  }, [debouncedVal]);

  const searchBook = async (query, maxResults) => {
    const res = await BooksAPI.search(query, maxResults);
    if (query === '') {
      setBooksToShow([]);
    } else if (res.error === 'empty query') {
      setBooksToShow([]);
    } else {
      giveShelfsToSearch(res);
    }
  };

  const giveShelfsToSearch = (res) => {
    for (let bookFromSearch of res) {
      findIDInBooksInShelfs(bookFromSearch, res);
    }
    setBooksToShow(res);
  };

  // shelf: STRING currentlyReading, wantToRead, read
  // ids: ARRAY of books inside shelfs
  // id: STRING of unique ID of the book
  // bookFromSearch_ID: ID of the book to find

  const findIDInBooksInShelfs = (bookFromSearch, res) => {
    Object.entries(booksInShelfs).map(([shelf, ids]) =>
      ids.map((id) => {
        if (id !== bookFromSearch.id && !bookFromSearch.hasOwnProperty(shelf)) {
          bookFromSearch.shelf = 'none';
        } else {
          setBooksToShow([...res], (bookFromSearch.shelf = shelf));
        }
      })
    );
  };

  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/' className='close-search'>
          Close
        </Link>
        <div className='search-books-input-wrapper'>
          <input
            type='text'
            onChange={updateQuery}
            placeholder='Search by title, author, or ISBN'
          />
        </div>
      </div>
      <div className='search-books-results'>
        <ol className='books-grid'>
          {booksToShow.map((item) => (
            <li key={item.id}>
              <div className='book'>
                <div className='book-top'>
                  <div
                    className='book-cover'
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${
                        item.imageLinks?.smallThumbnail
                          ? item.imageLinks.smallThumbnail
                          : null
                      })`,
                      // if there is a thumbnail will show the image in the background Image
                    }}
                  ></div>
                  <div>
                    {/* .find ((bookItem) => bookItem.id === item.id */}
                  </div>
                  <BookShelfChanger
                    bookID={item.id}
                    completeBook={item}
                    bookShelf={item.shelf}
                    onBookStateChange={onBookStateChange}
                  />
                </div>
                <div className='book-title'>{item.title}</div>
                <div className='book-authors'>{item.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Search;
