import express from 'express';
import Routes from './routes';  // Import routes from a separate file

// Define the port the server will listen on, either from environment variable or default to 5000
const port = process.env.PORT || 5000;

const app = express();  // Create an instance of an Express application

// Use the express.json() middleware to parse incoming JSON request bodies
app.use(express.json());

// Pass the Express app instance to the Routes function to define the routes
Routes(app);

// Start the server, listening on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);  // Log when the server is up and running
});
