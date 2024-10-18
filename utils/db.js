import { MongoClient } from 'mongodb';

/**
* - DBClient class handles interactions with the MongoDB database
*/
class DBClient {
  constructor() {
    // Get MongoDB connection details from environment variables or use defaults
    const host = process.env.DB_HOST || '127.0.0.1';  // Default to localhost if not set
    const port = process.env.DB_PORT || '27017';      // Default MongoDB port
    const database = process.env.DB_DATABASE || 'files_manager';  // Default database name
    
    // Create a new MongoClient instance for connecting to MongoDB
    this.cli = new MongoClient(`mongodb://${host}:${port}/${database}`, {
      useUnifiedTopology: true  // Ensure a unified topology across different MongoDB servers
    });
    
    // Establish connection to the database
    this.cli.connect().then(() => {
      console.log('Connected to MongoDB');
    }).catch(err => {
      console.error('Failed to connect to MongoDB:', err);
    });
  }

  // Check if the client is connected to MongoDB
  isAlive() {
    return this.cli.isConnected();  // Deprecated method in recent MongoDB Node.js drivers
  }

  // Get the number of documents in the 'users' collection
  async nbUsers() {
    return this.cli.db().collection('users').countDocuments();
  }

  // Get the number of documents in the 'files' collection
  async nbFiles() {
    return this.cli.db().collection('files').countDocuments();
  }

  // Access the 'files' collection in the database
  async files() {
    return this.cli.db().collection('files');
  }

  // Access the 'users' collection in the database
  async users() {
    return this.cli.db().collection('users');
  }
}

// Instantiate a single instance of the DBClient class
const dbClient = new DBClient();

export default dbClient;
