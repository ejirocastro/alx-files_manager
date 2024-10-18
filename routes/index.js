import { middleFromAuth, middleFromToken } from '../utils/auth';  // Middleware for authentication and token verification
import AuthController from '../controllers/AuthController';       // Controller for authentication-related routes
import AppController from '../controllers/AppController';         // Controller for application status and statistics
import UsersController from '../controllers/UsersController';     // Controller for user management
import FilesController from '../controllers/FilesController';     // Controller for file management

export default function Routes(app) {
  // Route to get the status of the app (e.g., check if the service is running)
  app.get('/status', AppController.getStatus);

  // Route to get application statistics (e.g., number of users, files, etc.)
  app.get('/stats', AppController.getStats);

  // Route to create a new user (sign-up functionality)
  app.post('/users/', UsersController.postNew);

  // Route to get the currently authenticated user's data, requires token authentication
  app.get('/users/me', middleFromToken, UsersController.getMe);

  // Route to disconnect the current user (log out), requires token authentication
  app.get('/disconnect', middleFromToken, AuthController.getDisconnect);

  // Route to authenticate and connect a user (log in), requires basic auth
  app.get('/connect', middleFromAuth, AuthController.getConnect);

  // Route to upload a new file, requires token authentication
  app.post('/files', middleFromToken, FilesController.postUpload);

  // Route to retrieve a specific file's metadata by its ID, requires token authentication
  app.get('/files/:id', middleFromToken, FilesController.getShow);

  // Route to publish a file, making it publicly accessible, requires token authentication
  app.put('/files/:id/publish', middleFromToken, FilesController.putPublish);

  // Route to unpublish a file, making it private again, requires token authentication
  app.put('/files/:id/unpublish', middleFromToken, FilesController.putUnpublish);

  // Route to list all files the user has uploaded, requires token authentication
  app.get('/files', middleFromToken, FilesController.getIndex);

  // Route to retrieve the actual file content by its ID, no token authentication required for this route
  app.get('/files/:id/data', FilesController.getFile);
}
