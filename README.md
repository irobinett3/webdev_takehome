# webdev_takehome

This is my Web Dev take home assignment, Piazza. Piazza represents the backend for a simple social network where users can register, log in, and create posts. Other users can view posts, but only logged-in users can create new ones.

- **User Authentication**: Users can sign up, log in, and get a token to authenticate requests.
- **Create and Manage Posts**: Users can create, view, update, and delete posts.
- **Simple and Secure**: Passwords are encrypted, and JWT tokens are used for secure login and access.

### Prerequisites

Before you start, make sure you have:

- **Node.js** 
- **MongoDB**
- **Postman**

### Steps to Set Up

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/piazza-backend.git
   ```

2. **Go into the project folder**:
   ```bash
   cd piazza-backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up your environment variables**:

   - Create a `.env` file in the root of the project.
   - Add your MongoDB connection string and a secret key for JWT:

     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```

5. **Start the server**:
   ```bash
   node index.js
   ```

   The backend will be running on `http://localhost:5001`.

## API Endpoints

1. **Register a User**  
   `POST /register`  
   Register a new user.
   
   **Example Body**:
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```

2. **Login a User**  
   `POST /login`  
   Log in and get a token for future requests.
   
   **Example Body**:
   ```json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

   **Response**:
   ```json
   {
     "token": "your_jwt_token"
   }
   ```

3. **Create a Post**  
   `POST /posts`  
   (Logged-in users only) Create a new post.

   **Headers**:
   ```json
   {
     "Authorization": "Bearer your_jwt_token"
   }
   ```

   **Example Body**:
   ```json
   {
     "title": "My First Post",
     "description": "This is my first post!"
   }
   ```

4. **Get All Posts**  
   `GET /posts`  
   Get a list of all posts (no login required).

5. **Get a Single Post**  
   `GET /posts/:id`  
   Get a specific post by its ID.

6. **Update a Post**  
   `PUT /posts/:id`  
   (Logged-in users only) Only the creator of the post can update it.

   **Headers**:
   ```json
   {
     "Authorization": "Bearer your_jwt_token"
   }
   ```

   **Example Body**:
   ```json
   {
     "title": "Updated Title",
     "description": "Updated description"
   }
   ```

7. **Delete a Post**  
   `DELETE /posts/:id`  
   (Logged-in users only) Only the creator of the post can delete it.

## Testing with Postman

You can use [Postman](https://www.postman.com/) to test the API:
