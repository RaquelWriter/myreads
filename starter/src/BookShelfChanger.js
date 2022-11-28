function BookShelfChanger({ bookID, completeBook, bookShelf, onBookStateChange }) {
  return (
    <div className='book-shelf-changer'>
      {/* onBookStateChange  receives two parameters:
        -book from the JSON data
        -shelf string) */}
      
      <select defaultValue={bookShelf} onChange={(e) => onBookStateChange (bookID, e.target.value, completeBook)}>
        <option value='moveTo' disabled>
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
