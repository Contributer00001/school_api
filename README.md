# School Management API

A Node.js API for managing school data with location-based sorting functionality.

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=school_management
   PORT=3000
   ```

4. Set up the database:
   - Create a MySQL database named `school_management`
   - Run the SQL commands from `api/database/schema.sql`

5. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Add School
- **URL**: `/addSchool`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 37.7749,
    "longitude": -122.4194
  }
  ```

### List Schools
- **URL**: `/listSchools`
- **Method**: `GET`
- **Query Parameters**:
  - `latitude`: User's latitude
  - `longitude`: User's longitude
- **Example**: `/listSchools?latitude=37.7749&longitude=-122.4194`

## Postman Collection

Import the following collection into Postman:

```json
{
  "info": {
    "name": "School Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Add School",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/addSchool",
        "body": {
          "mode": "raw",
          "raw": "{\n    \"name\": \"Example School\",\n    \"address\": \"123 School St\",\n    \"latitude\": 37.7749,\n    \"longitude\": -122.4194\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        }
      }
    },
    {
      "name": "List Schools",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/listSchools",
        "query": [
          {
            "key": "latitude",
            "value": "37.7749"
          },
          {
            "key": "longitude",
            "value": "-122.4194"
          }
        ]
      }
    }
  ]
}
```

## Error Handling

The API includes comprehensive error handling for:
- Invalid input data
- Database connection issues
- Server errors

All errors return appropriate HTTP status codes and error messages. 