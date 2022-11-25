function BookShelfChanger({ bookID, bookShelf, onBookStateChange }) {
  return (
    <div className='book-shelf-changer'>
      {/* onBookStateChange  receives two parameters:
        -book from the JSON data
        -shelf array) */}
      <div>{console.log('bookID en BookShelfChanger: ', bookID, 'bookShelf: ', bookShelf)}</div>
      <select defaultValue={bookShelf} onChange={(e) => onBookStateChange (bookID, e.target.value)}>
        <option value='none' disabled>
          Move to...
        </option>
        <option value='currentlyReading'>Currently Reading</option>
        <option value='wantToRead'>Want to Read</option>
        <option value='read'>Read</option>
        <option value='none'>None</option>
      </select>
    </div>
  );
}

export default BookShelfChanger;
