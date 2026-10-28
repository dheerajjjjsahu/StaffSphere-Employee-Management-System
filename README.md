# StaffSphere - Employee Management System

## About Project
StaffSphere is an Employee Management System built using the MERN stack. It helps users manage employee information

## Technologies Used
- React.js
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Features
- User registration and login
- Add new employees
- View employee details
- Edit employee information
- Delete employees
- Search employees by name or email
- Filter employees by department and status
- Dashboard statistics

## Project Structure
- `backend` - Backend APIs and database connection
- `frontend` - React frontend application

## How to Run the Project

### Backend
Open a terminal in VS Code:

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside the backend folder with your MongoDB connection string and JWT secret.

### Frontend
Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown in the terminal.

## API Documentation

The API runs at `https://staffsphere-employee-management-system.onrender.com` by default. Set `PORT` to use a different port. All request and response bodies use JSON.

### Health Check

`GET /`

Returns `200 OK` when the API is running:

```json
{
	"success": true,
	"message": "StaffSphere API is running"
}
```

### Authentication

#### Register

`POST /api/auth/register`

Request body:

```json
{
	"name": "Jordan Lee",
	"email": "jordan@example.com",
	"password": "your-password"
}
```

Returns `201 Created` with the new user's `id`, `name`, and `email`. Missing fields or an already-registered email return `400 Bad Request`.

#### Login

`POST /api/auth/login`

Request body:

```json
{
	"email": "jordan@example.com",
	"password": "your-password"
}
```

Returns `200 OK` with a JWT token and user details. The token expires after one day. Invalid credentials return `401 Unauthorized`.

### Employees

Employee endpoints currently do not require authentication.

#### List and filter employees

`GET /api/employees`

Optional query parameters:

- `search` searches employee names and emails (case-insensitive).
- `department` filters by an exact department value.
- `status` filters by `Active` or `Inactive`.

Example: `GET /api/employees?search=jordan&department=Engineering&status=Active`

Returns `200 OK` with `count` and an `employees` array, sorted newest first.

#### Get an employee

`GET /api/employees/:id`

Returns `200 OK` with the employee. Returns `400 Bad Request` for an invalid ID or `404 Not Found` if the employee does not exist.

#### Create an employee

`POST /api/employees`

Request body (all fields except `status` are required):

```json
{
	"name": "Jordan Lee",
	"email": "jordan@example.com",
	"phone": "555-0100",
	"department": "Engineering",
	"designation": "Software Engineer",
	"salary": 85000,
	"joiningDate": "2025-01-15",
	"status": "Active"
}
```

`status` accepts `Active` or `Inactive` and defaults to `Active`. Returns `201 Created` with the created employee; validation errors return `400 Bad Request`.

#### Update an employee

`PUT /api/employees/:id`

Send a JSON object containing the fields to update. Returns `200 OK` with the updated employee, `400 Bad Request` for an invalid ID or invalid data, or `404 Not Found` if the employee does not exist.

#### Delete an employee

`DELETE /api/employees/:id`

Returns `200 OK` when deleted, `400 Bad Request` for an invalid ID, or `404 Not Found` if the employee does not exist.

### Dashboard

`GET /api/dashboard`

Requires the JWT returned by login. Send it in the request header:

```http
Authorization: Bearer <token>
```

Returns `200 OK` with `totalEmployees`, `activeEmployees`, `inactiveEmployees`, and `totalDepartments`. A missing, invalid, or expired token returns `401 Unauthorized`.

## Environment Variables
Required variables:
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`

## Author
Dheeraj Sahu