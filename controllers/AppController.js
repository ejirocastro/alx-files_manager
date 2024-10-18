import redisClient from '../utils/redis';  // Import the Redis client utility
import dbClient from '../utils/db';        // Import the MongoDB client utility

// Define the AppController object to handle application-level requests
const AppController = {
  
  // Handler for checking the status of Redis and MongoDB services
  async getStatus(req, res) {
    // Check if Redis is connected and alive
    const rStat = await redisClient.isAlive();
    
    // Check if MongoDB (dbClient) is connected and alive
    const dStat = await dbClient.isAlive();
    
    // Respond with a JSON object containing the status of Redis and MongoDB
    res.json({ redis: rStat, db: dStat });
  },

  // Handler for fetching statistics (number of users and files)
  async getStats(req, res) {
    // Get the total number of users in the MongoDB 'users' collection
    const uCount = await dbClient.nbUsers();
    
    // Get the total number of files in the MongoDB 'files' collection
    const fCount = await dbClient.nbFiles();
    
    // Respond with a JSON object containing the counts of users and files
    res.json({ users: uCount, files: fCount });
  },
};

export default AppController;  // Export the AppController for use in other parts of the app

