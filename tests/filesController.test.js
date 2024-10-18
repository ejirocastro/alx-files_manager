describe('FilesController', () => {
  it('should upload a file', async () => {
    const response = await request(app)
      .post('/files')
      .set('Authorization', `Bearer <token>`)
      .attach('file', 'path/to/file.jpg'); // Adjust file path
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
  });

  it('should fetch a specific file by ID', async () => {
    const response = await request(app)
      .get('/files/<fileId>')
      .set('Authorization', `Bearer <token>`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe('<fileId>');
  });

  it('should return files with pagination', async () => {
    const response = await request(app)
      .get('/files?limit=10&page=1')
      .set('Authorization', `Bearer <token>`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeLessThanOrEqual(10);  // Replace with correct logic
  });

  it('should publish a file', async () => {
    const response = await request(app)
      .put('/files/<fileId>/publish')
      .set('Authorization', `Bearer <token>`);
    expect(response.status).toBe(200);
    expect(response.body.isPublished).toBe(true);
  });

  it('should unpublish a file', async () => {
    const response = await request(app)
      .put('/files/<fileId>/unpublish')
      .set('Authorization', `Bearer <token>`);
    expect(response.status).toBe(200);
    expect(response.body.isPublished).toBe(false);
  });

  it('should fetch file data by ID', async () => {
    const response = await request(app)
      .get('/files/<fileId>/data');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();  // Add actual file data checks
  });
});
