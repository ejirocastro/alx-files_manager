import redisClient from '../utils/redis';

describe('redisClient', () => {
  it('should check if Redis is alive', () => {
    expect(redisClient.isAlive()).toBe(true); // Modify the expectation based on your Redis setup
  });

  it('should set and get a key from Redis', async () => {
    await redisClient.set('test_key', 'test_value', 10);
    const value = await redisClient.get('test_key');
    expect(value).toBe('test_value');
  });

  it('should delete a key from Redis', async () => {
    await redisClient.set('test_key', 'test_value', 10);
    await redisClient.del('test_key');
    const value = await redisClient.get('test_key');
    expect(value).toBe(null);  // Or undefined based on your Redis implementation
  });
});
