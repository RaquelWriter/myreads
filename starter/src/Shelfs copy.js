import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Shelfs({ books }) {
  // UPDATE THE SHELFS WITH INITIAL STATE

  const [booksInShelfs, setBooksInShelfs] = useState([]);

  const initBooksState = () => {
    const currentlyReading = books.filter(
      (book) => book.shelf === 'currentlyReading'
    );
    const wantToRead = books.filter((book) => book.shelf === 'wantToRead');
    const read = books.filter((book) => book.shelf === 'read');
    setBooksInShelfs({
      currentlyReading: currentlyReading,
      wantToRead: wantToRead,
      read: read,
    });
  };

  useEffect(() => {
    initBooksState();
  }, []);
  /*   }; */

  return (
    <div className='list-books'>
      {console.log('BOOKS: ', books, 'booksInShelfs: ', booksInShelfs)}
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          {Object.keys(booksInShelfs).map((item, id) => (
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>{booksInShelfs[item]}</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  <li>
                    <div className='book'>
                      <div className='book-top'>
                        <div
                          className='book-cover'
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                              'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
                          }}
                        ></div>
                        <div className='book-shelf-changer'>
                          <select>
                            <option value='none' disabled>
                              Move to...
                            </option>
                            <option value='currentlyReading'>
                              Currently Reading
                            </option>
                            <option value='wantToRead'>Want to Read</option>
                            <option value='read'>Read</option>
                            <option value='none'>None</option>
                          </select>
                        </div>
                      </div>
                      <div className='book-title'>To Kill a Mockingbird</div>
                      <div className='book-authors'>Harper Lee</div>
                    </div>
                  </li>
                  <li>
                    <div className='book'>
                      <div className='book-top'>
                        <div
                          className='book-cover'
                          style={{
                            width: 128,
                            height: 188,
                            backgroundImage:
                              'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")',
                          }}
                        ></div>
                        <div className='book-shelf-changer'>
                          <select>
                            <option value='none' disabled>
                              Move to...
                            </option>
                            <option value='currentlyReading'>
                              Currently Reading
                            </option>
                            <option value='wantToRead'>Want to Read</option>
                            <option value='read'>Read</option>
                            <option value='none'>None</option>
                          </select>
                        </div>
                      </div>
                      <div className='book-title'>Ender's Game</div>
                      <div className='book-authors'>Orson Scott Card</div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='open-search'>
        <Link to='/addbook'>Add a book</Link>
      </div>
    </div>
  );
}
export default Shelfs;
