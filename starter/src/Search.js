import { useState, useEffect } from 'react';
import BookShelfChanger from './BookShelfChanger';
import { Link } from 'react-router-dom';
function Search({ booksToShow, searchBook }) {
  // SEARCH

  const [query, setQuery] = useState('');

  const updateQuery = (e) => {
    setQuery(e.target.value.trim());
    console.log('query: ', query);
  };

  useEffect(() => {
    query.trim() === ''
      ? console.log('NO MUESTRO NINGUN LIBRO')
      : searchBook(query, 10);
  }, [query]);

  /* const [query, setQuery] = useState('');

const updateQuery = (query) => {
  setQuery(query.trim());
  console.log(query);
};

const clearQuery = () => {
  updateQuery("");
};

const showingContacts =
  query === ''
    ? contacts
    : contacts.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      );
*/

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
        {console.log('booksToShow: ', booksToShow)}
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
                      backgroundImage: `url(${item.imageLinks.smallThumbnail})`,
                    }}
                  ></div>
                  <BookShelfChanger
                    bookID={item.id}
                    bookShelf={item.shelf}
                    /*                             onBookStateChange={onBookStateChange} */
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
