import { Link } from 'react-router-dom';
import BookShelfChanger from './BookShelfChanger';

const shelfsTitles = ['Currently Reading', 'Want To Read', 'Read'];

function Shelfs({ books, booksInShelfs, onBookStateChange }) {

  console.log('BOOKS: ', books);
  return (
    <>
      <div className='list-books-content'>
        <div>
          {Object.keys(booksInShelfs).map((item, key) => (
            <div className='bookshelf' key={key}>
              <h2 className='bookshelf-title'>{shelfsTitles[key]}</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {booksInShelfs[item].map((bookID) => (
                    <li key={bookID}>
                      <div className='book'>
                        <div className='book-top'>
                          <div
                            className='book-cover'
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                books.find((item) => item.id === bookID)
                                  .imageLinks?.smallThumbnail
                                  ? books.find((item) => item.id === bookID)
                                      .imageLinks.smallThumbnail
                                  : null
                              })`,
                            }}
                          ></div>
                          <BookShelfChanger
                            bookID={bookID}
                            bookShelf={item}
                            onBookStateChange={onBookStateChange}
                          />
                        </div>
                        <div className='book-title'>
                          {books.find((item) => item.id === bookID).title}
                        </div>
                        <div className='book-authors'>
                          {books.find((item) => item.id === bookID).authors}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='open-search'>
        <Link to='/search'>Search</Link>
      </div>
    </>
  );
}
export default Shelfs;
