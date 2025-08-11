# API Documentation

This document describes the API endpoints used by LearnVerse platform.

## Base URL

```
https://learnverse.onrender.com
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Register
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Online Testing System

#### Get Online Test
```http
POST /user/online-test
Authorization: Bearer <token>
Content-Type: application/json

{
  "level": "beginner|intermediate|advanced"
}
```

#### Save Grade
```http
POST /user/save-grade
Authorization: Bearer <token>
Content-Type: application/json

{
  "testLevel": "beginner|intermediate|advanced",
  "grade": 85
}
```

#### Get Evaluation Test
```http
GET /user/evaluation-test
Authorization: Bearer <token>
```

#### Save Evaluation
```http
POST /user/save-evaluation
Authorization: Bearer <token>
Content-Type: application/json

{
  "level": "beginner|intermediate|advanced"
}
```

### Vocabulary System

#### Get Vocabularies by Category
```http
GET /user/vocabularies/{categoryId}
```

#### Get Vocabulary Test
```http
POST /user/test-vocabulary
Authorization: Bearer <token>
Content-Type: application/json

{
  "categoryId": "category-id"
}
```

### Teacher Question Bank

#### Add Question to Bank
```http
POST /teacher/add-question-to-the-bank
Authorization: Bearer <token>
Content-Type: application/json

{
  "level": "beginner|intermediate|advanced",
  "question": "What is the past tense of 'go'?",
  "A": "went",
  "B": "goed",
  "C": "gone",
  "D": "going",
  "answer": "A"
}
```

#### Remove Question from Bank
```http
DELETE /teacher/remove-question-from-the-bank/{questionId}
Authorization: Bearer <token>
```

### Category Management

#### Add Category
```http
POST /teacher/add-category
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Business English"
}
```

#### Delete Category
```http
DELETE /teacher/delete-category/{categoryId}
Authorization: Bearer <token>
```

### Vocabulary Management

#### Add Vocabulary
```http
POST /teacher/add-vocabulary
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "entrepreneur - a person who starts and runs a business",
  "categoryId": "category-id"
}
```

#### Update Vocabulary
```http
PATCH /teacher/update-vocabulary
Authorization: Bearer <token>
Content-Type: application/json

{
  "vocabularyId": "vocab-id",
  "text": "updated vocabulary text"
}
```

#### Remove Vocabulary
```http
DELETE /teacher/remove-vocabulary/{vocabularyId}
Authorization: Bearer <token>
```

### Video Management

#### Add Video to Course
```http
POST /video/add-to-course
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Introduction to Grammar",
  "courseId": "course-id"
}
```

#### Update Video
```http
PATCH /video/update-from-course
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Video Title",
  "videoId": "video-id"
}
```

#### Delete Video
```http
DELETE /video/delete-video/{videoId}
Authorization: Bearer <token>
```

#### Get Video by ID
```http
GET /video/{videoId}
```

#### Add Video View
```http
POST /video/add-view
Content-Type: application/json

{
  "videoId": "video-id"
}
```

### Dictionary

#### Lookup Word
```http
POST /dictionary/
Content-Type: application/json

{
  "word": "example"
}
```

### Love/Like System

#### Add Love
```http
POST /love/add-love
Authorization: Bearer <token>
Content-Type: application/json

{
  "videoId": "video-id"
}
```

#### Get All Loves
```http
GET /love/get-all-loves
Authorization: Bearer <token>
```

#### Delete Love
```http
DELETE /love/delete-love/{loveId}
Authorization: Bearer <token>
```

#### Find Love for Video
```http
POST /love/find-love-for-this-video
Authorization: Bearer <token>
Content-Type: application/json

{
  "videoId": "video-id"
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `422` - Unprocessable Entity
- `500` - Internal Server Error

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Error Handling

The API uses standard HTTP status codes and returns error messages in JSON format. Always check the `success` field in the response to determine if the request was successful.
