# Task Manager App

A full-stack task management app built as part of a take-home challenge. The project includes a .NET backend API and a React frontend interface to view, create, and manage tasks.

---

## Tech Stack

- **Backend:** .NET Minimal APIs, Entity Framework Core (SQLite)
- **Frontend:** React, CSS Modules
- **Database:** SQLite
- **API Testing:** Postman (collection included in `/postman`)

---

## Features Implemented

### Backend
- `GET /api/tasks` — fetch all tasks
- `POST /api/tasks` — create a new task
- `PUT /api/tasks/{id}` — update task title, description, status, or assignee
- `DELETE /api/tasks/{id}` — delete a task
- `GET /api/workers` — fetch available workers
- `POST /api/workers` — add a new worker

This project includes a prepopulated SQLite database (TaskManager.db) located in the backend/Data/ folder.
It is provided for demo purposes, so you can run the app and see example tasks and workers immediately.

### Frontend
- View task list (filtered by status)
- Create new tasks and workers via modal forms
- Inline editing of task fields (title, description, status, assignee)
- Save/cancel changes with state diff tracking
- Delete tasks

---

## Setup

### 1. Backend Setup (.NET)
`cd backend`

`dotnet restore`

`dotnet ef database update` (optional)

`dotnet run`

### 1. Frontend Setup (React)
`cd frontend`

`npm install`

`npm start`

---

## Assumptions and Notes
- I used SQLite via Entity Framework Core for persistence.
- Minimal API architecture is used for simplicity but structured cleanly with separate endpoint mapping files.
- The "toggle completion" requirement was interpreted as status control (Todo, InProgress, Completed, Blocked).
- Tasks can optionally be assigned to workers. This supports extensibility but wasn't required.
- The UI is responsive and styled with dark theme + yellow accents (Ezra branding inspiration).
- Tasks can optionally be assigned to workers. 
- Although I didn't have time to implement a UI for deleting workers, if a worker is deleted through Postman, all tasks assigned to that worker will automatically update and show them as Unassigned in the frontend.

---

## If I Had More Time I would:
- Add authentication and authorization
- Deploy the full stack
- Implement full CRUD for workers on the frontend (including editing and deletion)
- Add unit and integration tests
- Allow drag-and-drop task reordering (e.g. Kanban-style)
- Add tags or labels for task categorization
- Add an AI helper for each task that could provide comments and direction
