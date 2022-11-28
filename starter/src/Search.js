import { useState, useEffect } from 'react';
import * as BooksAPI from './BooksAPI';
import BookShelfChanger from './BookShelfChanger';
import useDebounce from './useDebounce';
import { Link } from 'react-router-dom';

function Search({ books, setBooks, onBookStateChange, booksInShelfs }) {
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
    // Initialize with shelf = 'none'
    Object.keys(res).map((key) => (res[key].shelf = 'none'));
    // Assign the right shelf to books of the search page
    const assignShelfs = () => {
      for (let book of books) {
        for (let bookRes of res) {
          if (book.id === bookRes.id) {
            bookRes.shelf = book.shelf
          } 
        }
      }
    };
    assignShelfs();
    // Update the state variable booksToShow with the books with right shelves
    setBooksToShow(res);
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
