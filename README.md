# User Profile Management API

A RESTful API for managing user profiles built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication
- JWT-based authentication with refresh tokens
- Profile management (view and update)
- Input validation using Zod
- Secure password hashing with bcrypt
- MongoDB integration using Mongoose

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### User Profile

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## Data Models

### User

- name (String, required, min 2 chars)
- email (String, required, unique)
- password (String, required, min 6 chars)
- address (String, required, max 200 chars)
- bio (String, optional)
- profilePicture (String, optional)
- refreshToken (String)
- timestamps (created/updated)

## Input Validation

Input validation is handled using Zod schema validation:

### Registration

- name: 2-50 characters
- email: valid email format
- password: 6-100 characters
- address: max 200 characters
- bio: max 500 characters (optional)
- profilePicture: string (optional)

### Login

- email: valid email format
- password: required

## Security Features

- Password hashing using bcrypt
- JWT authentication
- Input sanitization and validation
- Protected routes using authentication middleware

## Error Handling

The API includes comprehensive error handling for:

- Validation errors
- Authentication errors
- Database errors
- Server errors

## Getting Started

1. Clone the repository
2. Install dependencies:

## Core Services

### Auth Service (`auth.service.js`)

- Token generation and management
- Refresh token generation and handling
- User registration service
- User login service

### User Service (`user.service.js`)

- Profile update and retrieval operations

## Environment Variables

The following environment variables need to be set in a `.env` file:

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Server port number (default: 3000)
- `NODE_ENV`: Environment mode (development/production)
