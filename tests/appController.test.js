import request from 'supertest';
import app from '../app';  // Assuming your Express app is exported from app.js

describe('AppController', () => {
  it('should get the status of the app', async () => {
    const response = await request(app).get('/status');
    expect(response.status).toBe(200);
    expect(response.body.redis).toBe(true); // Modify based on actual logic
    expect(response.body.db).toBe(true);
  });

  it('should get the app statistics', async () => {
    const response = await request(app).get('/stats');
    expect(response.status).toBe(200);
    expect(response.body.users).toBeDefined(); // Replace with actual checks
    expect(response.body.files).toBeDefined();
  });
});
