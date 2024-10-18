describe('UsersController', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe('test@example.com');
    expect(response.body.id).toBeDefined();
  });

  it('should return an error for missing email', async () => {
    const response = await request(app)
      .post('/users')
      .send({ password: 'password123' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Missing email');
  });

  it('should authenticate a user', async () => {
    const response = await request(app).get('/connect').auth('test@example.com', 'password123');
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should disconnect a user', async () => {
    const response = await request(app).get('/disconnect').set('Authorization', `Bearer <token>`); // Use the correct token
    expect(response.status).toBe(204); // 204 means no content (successful logout)
  });

  it('should get the current user info', async () => {
    const response = await request(app).get('/users/me').set('Authorization', `Bearer <token>`);
    expect(response.status).toBe(200);
    expect(response.body.email).toBeDefined();
    expect(response.body.id).toBeDefined();
  });
});
