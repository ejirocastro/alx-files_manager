import dbClient from '../utils/db';

describe('dbClient', () => {
  it('should check if MongoDB is alive', () => {
    expect(dbClient.isAlive()).toBe(true); // Adjust based on MongoDB setup
  });

  it('should count the number of users', async () => {
    const userCount = await dbClient.nbUsers();
    expect(userCount).toBeGreaterThanOrEqual(0); // Replace with appropriate checks
  });

  it('should count the number of files', async () => {
    const fileCount = await dbClient.nbFiles();
    expect(fileCount).toBeGreaterThanOrEqual(0); // Replace with appropriate checks
  });
});
