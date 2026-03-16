# Docker Person App

This project is a full-stack web application built with Docker.

## Technologies Used

- React (Frontend)
- Node.js + Express (Backend)
- PostgreSQL (Database)
- Docker
- Docker Compose

## Project Features

The application allows users to:

- Add a person
- View the list of people
- Delete a person

## Project Architecture

The system consists of three main services:

Frontend → React application  
Backend → Node.js REST API  
Database → PostgreSQL database

All services run in separate Docker containers and communicate through Docker Compose.

## Running the Project

To run the application:

```bash
docker-compose up --build
```

After running the containers:

Frontend  
```
http://localhost:5174
```

Backend API  
```
http://localhost:5000/api/people
```

## API Endpoints

GET all people

```
GET /api/people
```

Add person

```
POST /api/people
```

Delete person

```
DELETE /api/people/:id
```

## Screenshots

(Add screenshots of the running application here)
