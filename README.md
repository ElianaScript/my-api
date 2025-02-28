Social Network API (MERN Stack)


## Description
This is a backend API for a social network web application built with Node.js, Express.js, and MongoDB using Mongoose ODM. The API enables users to share thoughts, react to friends' thoughts, and manage their friend list.

## Features
User Authentication: Users can create and manage accounts.
Post Thoughts: Users can share thoughts with their friends.
Friend List: Users can manage their list of friends.
Reactions: Users can react to their friends' posts with likes or comments.
Timestamps: Each post, reaction, and user activity has a timestamp.

## Technologies Used
Node.js: Backend runtime environment.
Express.js: Web framework for routing.
MongoDB: NoSQL database for storing user data, posts, reactions, and friends.
Mongoose: ODM (Object Data Modeling) library for MongoDB.
JavaScript Date Object (or optional date library): For handling and formatting timestamps.


## Installation
Prerequisites
Ensure you have the following installed on your local machine:

Node.js
MongoDB

Steps to Install

Clone the Repository:

bash
Copy
Edit
git clone https://github.com/yourusername/social-network-api.git


Install Dependencies:

bash
Copy
Edit
cd social-network-api
npm install
Set Up Environment Variables:

Create a .env file in the root of your project directory and add your MongoDB URI:

plaintext
Copy
Edit
MONGO_URI=mongodb://localhost:27017/social_network
Run the Server: Start the API server using the following command:

bash
Copy
Edit
npm start
The server will run on http://localhost:5000.

API Endpoints
1. User Routes
POST /api/users: Create a new user.

Request Body:
json
Copy
Edit
{
  "username": "JohnDoe",
  "email": "johndoe@example.com"
}
Response:
Status: 201
Body: Newly created user
GET /api/users: Get all users (useful for testing).

Response:
Status: 200
Body: List of all users.
GET /api/users/:userId: Get a specific user by their ID.

Response:
Status: 200 (User found)
Status: 404 (User not found)
2. Post Routes
POST /api/posts: Create a new post (thought).

Request Body:
json
Copy
Edit
{
  "userId": "userId123",
  "content": "This is my first post!"
}
Response:
Status: 201
Body: The newly created post
GET /api/posts: Get all posts.

Response:
Status: 200
Body: List of all posts.
GET /api/posts/:postId: Get a specific post by ID.

Response:
Status: 200 (Post found)
Status: 404 (Post not found)
PUT /api/posts/:postId: Update a post by ID.

Request Body:
json
Copy
Edit
{
  "content": "Updated content"
}
Response:
Status: 200
Body: Updated post
DELETE /api/posts/:postId: Delete a post by ID.

Response:
Status: 200 (Deleted)
Status: 404 (Post not found)
3. Friend Routes
POST /api/friends/:userId/:friendId: Add a friend.

Response:
Status: 200
Body: Success message
DELETE /api/friends/:userId/:friendId: Remove a friend.

Response:
Status: 200
Body: Success message
4. Reaction Routes
POST /api/reactions/:postId: React to a post (like or comment).
Request Body:
json
Copy
Edit
{
  "userId": "userId123",
  "reaction": "like" // or "comment"
}
Response:
Status: 201
Body: Success message
Video Walkthrough
Please watch the walkthrough video to see the functionality in action, including creating users, posts, managing friends, and reacting to posts.
Video Walkthrough Link

## Contributing
Feel free to fork the repository, create a new branch, and submit a pull request for contributions. All pull requests should adhere to the existing coding style.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

