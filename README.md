# Game of Thrones Character Viewer
This demonstrates a simple search and add to favorites using React Hooks, React Query, and Context API. 
Styling done with basic CSS, flex grid, and material ui. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### Features 
* Loads data from game of thrones API
* Typing into search box on home screen filters characters by matching name.
* Clicking on the star by a character adds them to your favorites
* Navigating to the 'Favorites' tab will display your current favorites.
* Pagination controls implemented for search results
* Clicking on a character opens a detail modal
* Favorites are stored on local storage and will be persisted after refreshing the page.
* Throttle switch will add a 5 second network delay to requests (allowing you to view some of the loading states)
