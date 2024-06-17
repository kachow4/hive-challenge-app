
# Katie Chow - Hive Take Home Prompt

Thank you for the challenge, I had a fun time!

## Instructions to Run the Project
1) Clone the repository using git clone [insert link] in your terminal
2) In your terminal, navigate to 'hive-challenge-app' in your directory using cd
3) Once in the correct directory, run 'npm install'
3) When finished installing, run 'npm start' to start the project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## DropdownMenu Component
* options prop takes in a list of objects with the format {id: ___ , value: ___} assuming that the list of data is fetched from a database. The id is included to be used as a key for list items.
* width, height, and maxWidth props to help style the button (default values are 'fit-content', '40px', and '260px' respectively)
* multiSelect takes in a boolean (default is false)
* label takes a string (default is "Select Value: ")
  
## Imports Used:
* react-windows: for better efficiently loading lots of data
* font awesome: for the chevron icons in the dropdown button

## Notes:
* I try to use ternary operators wherever possible, but if the code becomes unreadable, I like to use if/else statements so it is easier on the eye
* To fully focus on using React and JavaScript, I built this app with create-react-app, but when building larger apps I would start with using NextJS framework
* If data doesn't include ids to use as keys, I generate keys using crypto.randomUUID()

## Other improvements I would make:
* use Redux for state management
* improve the speed of selecting/deselecting all checkboxes when there is a large amount of them
* if I could modularize the code more, I could consider creating separate presentational components to help with readability, such as making a Modal component separate from the Button/Dropdown Component
* add more props for more flexible styling
* improve styling, responsiveness and animations

## Available Scripts

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information

