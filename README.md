This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Description

A personal project to practice React and Express by creating my own full-stack application. It is intended to funcation as a minimal yearly planning app, utilizing React useReducer for state management and React Query to make HTTP requests through a custom API, which interfaces with an Express back-end that queries a PostgreSQL database.

## To Run This Project

In the project directory, you can run:

### `npm start`

Which runs the app in the development mode.\
Front-end React app (client/) runs on [http://localhost:3000](http://localhost:3000), backend Express server (server.js) is [http://localhost:8000](http://localhost:8000).

Database host, port, username, password, etc. will need to be added. Uses pg for pool connections between Postgres server and Express server.

## Project Features
✓ Users can create "projects" or goals and assign them to months via drag-and-drop<br>
✓ Each month's projects can be viewed by clicking on the month name<br>
✓ Project start and end date can be edited by clicking on the project while in month view<br>

## Future Work
* Lots