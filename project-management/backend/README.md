# Backend API with Node.js

This project is a backend API built using Node.js and Express. It provides a robust API for managing data and interactions for the associated frontend application.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server in development mode.  
Open [http://localhost:3000](http://localhost:3000) to interact with the API.

The server will restart automatically when you make changes to the code.  
You may also see any lint errors in the console.

### `npm test`

Launches the test runner to execute the tests defined for the project.  
Check the test results in the console.

### `npm run build`

Prepares the app for production by compiling and optimizing the code.  
The compiled code is located in the `dist` folder, ready for deployment.

### `npm run dev`

Starts the server in development mode using [nodemon](https://github.com/remy/nodemon), which automatically restarts the server when file changes in the directory are detected.

### `npm run lint`

Runs the linter to check for code style and syntax issues.  
Review the output in the console and fix any highlighted issues.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `PORT`: Port number on which the server will run (e.g., 3000)
- `DATABASE_URL`: URL for connecting to your PostgreSQL database

## Project Structure

- `src/`: Contains the main source code of the application
  - `controllers/`: Handles the incoming requests and business logic
  - `models/`: Defines the data models and schemas
  - `routes/`: Manages the routing for different API endpoints
  - `middlewares/`: Includes middleware functions for request processing
  - `config/`: Contains configuration files and environment setup
- `tests/`: Holds the test files for the project
- `public/`: Stores public assets and files

## Features

- RESTful API endpoints for data management
- Middleware for request validation and error handling
- Integration with PostgreSQL for persistent data storage

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nestor711/IPD_Proyecto_Final
   cd backend-api

2. Install dependencies:
   npm install

3. Create a .env file in the root directory and add the required environment variables as mentioned in the Environment Variables section.

4. Start the server:
   npm start


## Usage
After starting the server, you can access the API at http://localhost:3000. Refer to the API documentation for available endpoints and their usage.
