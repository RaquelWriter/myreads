# My Reads project - Raquel Sánchez Ventero

Web app for searching, filtering and updating books in shelfs using REACT and WEBPACK.

## STARTING

How to start:

- download the repository.
- install all project dependencies with `npm install`
- start the development server with `npm start`

## COMPONENTS

### App 

#### States: books, booksInShelfs
- books: Stores the value get by getAll() from BooksAPI
- booksInShelfs: Stores the value of get() from BooksAPI

#### Functions:
- getBooks: calls to the getAll() in BookAPI
- initBooksState: initizalize the first state of the books in the shelves.
- onBookStateChange: called from BookShelfChanger, manages the changes of shelves from the button.
- Route: It has two routes: Shelfs / and Search /search

### Shelfs
#### States: inherit books, booksInShelfs from App
#### Functions:
- Inherit onBookStateChange from App

### Search
#### States: query, booksToShow
#### Functions:
- searchBook: calls async the search function in the BooksAPI. The result is pass to: giveShelfsToSearch function.
- giveShelfsToSearch and findIDInBooksInShelfs: These functions will find the right shelves for the Books shown in the Search page.
- findIDInBooksInShelfs: In this function is updated the state of booksToShow with the shelves.

### BooksShelfChanger
- Inherit variables: bookID, completeBook, bookShelf
- Inherit functions: onBookStateChange
- The button for selecting the shelves.

### useDebounce (custom hook from Harash)
- This debounce is called from the Search component for avoiding the use of an unmounted component, while using the search form.

## Architecture

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── Shelfs.js # COMPONENT for the main page, which shows the books that actually the user has in the shelfs.
    ├── Search.js # COMPONENT for the searching page.
    ├── BookShelfChanger.js # COMPONENT which is used for the shelves changer button.
    ├── useDebounce.js # CUSTOM HOOK, made by Mr. Harsh. I changed it a little bit.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
