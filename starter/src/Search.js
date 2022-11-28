import { useState, useEffect } from 'react';
import BookShelfChanger from './BookShelfChanger';
import useDebounce from './useDebounce';
import { Link } from 'react-router-dom';
function Search({ setBooksToShow, booksToShow, searchBook, onBookStateChange }) {
  // SEARCH

  const [query, setQuery] = useState('');
  const debouncedVal = useDebounce(query, 500);

  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(e.target.value.trim());
    console.log('query: ', query);
  };

  useEffect(() => {
    if (!debouncedVal) {
      setBooksToShow([]);
    } else {
      searchBook(query, 20);
    }
  }, [debouncedVal]);
  
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
        {console.log('MUESTRO LOS LIBROS: booksToShow: ', booksToShow)}
        <ol className='books-grid'>
          {booksToShow.map((item) => (
            <li key={item.id}>
              {console.log('ITEMID::::: ', item.id)}
              <div className='book'>
                {console.log('booksToShow: ', booksToShow)}
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
                    {console.log('HEY:: ', item, ' / ', item.id, ' / ', item.shelf)}
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
