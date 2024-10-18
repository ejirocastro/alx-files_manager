import sha1 from 'sha1';  // Import the sha1 hashing function for password encryption
import dbClient from '../utils/db';  // Import the MongoDB client utility

// Define the UsersController object to handle user-related requests
const UsersController = {

  // Handler for creating a new user (sign-up)
  async postNew(req, res) {
    // Extract the email and password from the request body, or set them to null if missing
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;
    
    // If the email is missing, return a 400 Bad Request with an error message
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    // If the password is missing, return a 400 Bad Request with an error message
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Access the 'users' collection from the MongoDB client
    const users = await dbClient.users();

    // Check if a user with the same email already exists in the database
    if (await users.findOne({ email })) {
      return res.status(400).json({ error: 'Already exist' });  // Return an error if the email is already registered
    }

    // Hash the user's password using the sha1 algorithm for secure storage
    const hashed = sha1(password);

    // Insert the new user into the database with the email and hashed password
    const result = await users.insertOne({ email, password: hashed });

    // Respond with a 201 Created status and return the email and the new user's unique ID
    return res.status(201).json({ email, id: result.insertedId.toString() });
  },

  // Handler for fetching the current authenticated user's information
  async getMe(req, res) {
    // The authenticated user object is expected to be attached to the request (e.g., via middleware)
    const { user } = req;

    // Respond with the user's email and ID as a JSON object
    return res.status(200).json({ email: user.email, id: user._id.toString() });
  },

};

export default UsersController;  // Export the UsersController for use in other parts of the app
