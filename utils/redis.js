#!/usr/bin/node
// Import the Redis client module and the 'util' module for promisifying functions
import { createClient } from 'redis';
import { promisify } from 'util';

// RedisClient class to manage Redis operations
class RedisClient {
  constructor() {
    // Create a Redis client instance
    this.cli = createClient();

    // Listen for connection errors and log them
    this.cli.on('error', (err) => {
      console.log(`Redis Error: ${err}`);
    });
  }

  // Check if Redis client is connected (alive)
  isAlive() {
    return this.cli.connected;
  }

  // Get the value associated with a specific key (async operation)
  async get(key) {
    // Promisify the 'get' method of Redis client for async/await usage
    const gt = promisify(this.cli.get).bind(this.cli);
    // Retrieve and return the value of the key
    return gt(key);
  }

  // Set a key-value pair in Redis with an expiration time (async operation)
  async set(key, value, duration) {
    // Promisify the 'set' method of Redis client for async/await usage
    const st = promisify(this.cli.set).bind(this.cli);
    // Set the key with the given value and expiry time (in seconds)
    return st(key, value, 'EX', duration);
  }

  // Delete a key from Redis (async operation)
  async del(key) {
    // Promisify the 'del' method of Redis client for async/await usage
    const dlt = promisify(this.cli.del).bind(this.cli);
    // Delete the specified key
    return dlt(key);
  }
}

// Create an instance of RedisClient and export it for use in other modules
const redisClient = new RedisClient();

export default redisClient;
