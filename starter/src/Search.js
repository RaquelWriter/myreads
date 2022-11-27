import { useState, useEffect } from 'react';
import BookShelfChanger from './BookShelfChanger';
import { Link } from 'react-router-dom';
function Search({ booksToShow, searchBook, onBookStateChange }) {
  // SEARCH

  const [query, setQuery] = useState('');

  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(e.target.value.trim());
    console.log('query: ', query);
  };

  useEffect(() => {
    const updateSearchPage = setTimeout(() => {
      if (query) {
        searchBook(query, 10);
        console.log('QUERY!!!: ', query);
      } else {
        searchBook('zzzzzz', 0);
      }
    }, 500);
    return () => clearTimeout(updateSearchPage);
  }, [query]);

  /*   useEffect(() => {
    let unmounted = false;
    if ((!unmounted) && query !== '') {
      searchBook(query, 10);
      console.log('QUERY!!!: ', query)
    } else {
      searchBook('zzzzzz', 0);
    }

    return () => {
      unmounted = true;
    };
  }, [query]); */

  /* const showSearchBooks = () =>{
  query === ''
  ? console.log('NO MUESTRO NINGUN LIBRO')
  : searchBook(query, 10);
} */

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

  /* {
  showingContacts.length !== contacts.length && (
    <div className="showing-contacts">
      <span>Now showing {showingContacts.length} of {contacts.length}</span>
      <button onClick={() => clearQuery()}>Show all</button>
    </div>
  )
} */

  /*   const findShelf = (bookIDFromSearch) => {
    Object.values(booksInShelfs)
      .map((bookFromShelf) => bookFromShelf.id)
      .find((id) => id === bookIDFromSearch)
      ?  getShelf() 
      : console.log('NO ENCONTRADO');
  }; */
  
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
