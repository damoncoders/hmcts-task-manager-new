# HMCTS Task Manager Challenge

A simple task management system built for the HMCTS developer challenge. It allows users to create, view, update, and delete tasks with a clean and user-friendly interface that prioritises accessibility, usability, and security.

This project was built using **Next.js** with **Tailwind CSS**, **Shadcn UI**, and **React Hook Form** for the frontend, and **Laravel API** with **PostgreSQL** for the backend. It follows best practices in test-driven development (TDD), modern software architecture, and accessible design principles inspired by the GOV.UK Design System.

![Screenshot](https://cdn.fortiplacecdn.com/task.png)

---

## 🔧 Features

- Create, read, update, and delete tasks
- View task details
- Form validation with Zod and React Hook Form
- Status selection (Pending, In Progress, Completed)
- Visual feedback using Sonner
- Accessible UI components (Radix + Shadcn)
- TDD coverage using PHPUnit and Testing Library
- Modern software architecture with SOLID principles
- Accessible design principles inspired by the GOV.UK Design System
- Secure input handling with Zod and Laravel validation to protect against XSS and injection attacks
- CORS enabled for the API to allow requests from the frontend

---

## 📦 Tech Stack

### Backend (Laravel)

- Laravel 12
- PHP 8.2
- Laravel API + Sanctum
- PostgreSQL
- PHPUnit

### Frontend (Next.js)

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Shadcn UI
- React Hook Form + Zod
- Sonner (Notifications)
- Radix UI
- Lucide React
- Jest
- Testing Library
- TypeScript

---

## 🧪 API Endpoints

**Use curl to test the endpoints**

> Replace localhost:8000 with your backend URL if hosted elsewhere and ensure it is on the same domain as the frontend to avoid CORS issues.

**Create a task**

```bash
curl -X POST http://localhost:8000/api/tasks -H "Content-Type: application/json" -d '{"title": "Test Task", "description": "This is a test task", "status": "pending", "due_date": "2024-12-31T00:00:00.000000Z"}'
```

- `POST /api/tasks` – create a task

**Sample request body:**

```json
{
  "title": "Test Task",
  "description": "This is a test task",
  "status": "pending",
  "due_date": "2024-12-31T00:00:00.000000Z"
}
```

**Sample response:**

```json
{
  "data": {
    "id": 1,
    "title": "Test Task",
    "description": "This is a test task",
    "status": "pending",
    "due_date": "2024-12-31T00:00:00.000000Z"
  }
}
```

**List all tasks**

```bash
curl -X GET http://localhost:8000/api/tasks
```

- `GET /api/tasks` – list all tasks

**Sample response:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Test Task",
      "description": "This is a test task",
      "status": "pending",
      "due_date": "2024-12-31T00:00:00.000000Z"
    }
  ]
}
```

**Get a single task**

```bash
curl -X GET http://localhost:8000/api/tasks/1
  -H "Accept: application/json"
```

- `GET /api/tasks/{id}` – get a single task

**Sample response:**

```json
{
  "data": {
    "id": 1,
    "title": "Test Task",
    "description": "This is a test task",
    "status": "pending",
    "due_date": "2024-12-31T00:00:00.000000Z"
  }
}
```

**Update a task**

```bash
curl -X PUT http://localhost:8000/api/tasks/1 -H "Content-Type: application/json" -d '{"title": "Updated Task", "description": "This is an updated task", "status": "in_progress", "due_date": "2024-12-31T00:00:00.000000Z"}'
```

- `PUT /api/tasks/{id}` – update a task

**Sample request body:**

```json
{
  "title": "Updated Task",
  "description": "This is an updated task",
  "status": "in_progress",
  "due_date": "2024-12-31T00:00:00.000000Z"
}
```

**Delete a task**

```bash
curl -X DELETE http://localhost:8000/api/tasks/1
```

- `DELETE /api/tasks/{id}` – delete a task

**Sample response:**

```json
{
  "data": null
}
```

---

## 🚀 Installation

To get started you need to download the repository and install the dependencies for both the frontend and backend.

1. Clone the repository:

```bash
git clone https://github.com/damoncoders/hmcts-task-manager-new
```

### Backend (Laravel)

**Prerequisites:**

- Composer
- PHP 8.2
- PostgreSQL

To run the backend, you need to have Composer installed. You can download it from [here](https://getcomposer.org/download/).

#### Prerequisites

1. Install PHP (if not already installed) on macOS:
   ```bash
   /bin/bash -c "$(curl -fsSL https://php.new/install/mac/8.2)"
   ```

#### Setup Instructions

1. Install Laravel dependencies:

   ```bash
   cd backend
   composer install
   ```

2. Configure environment and database:

   a. Copy the .env.example file to .env:

   ```bash
   cp .env.example .env
   ```

   b. Ensure the database is set up in the .env file:

   ```bash
   DB_CONNECTION=pgsql
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=backend
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   ```

   > **Note:** Make sure PostgreSQL is installed and running on your system before proceeding. You can download it from [here](https://www.postgresql.org/download/).

3. Generate application key:

   ```bash
   php artisan key:generate
   ```

4. Run database migrations:

   ```bash
   php artisan migrate
   ```

5. Start the development server:

   ```bash
   php artisan serve
   ```

6. Run tests:
   ```bash
   php artisan test
   ```

### Frontend (Next.js)

**Prerequisites:**

- Node.js 20
- pnpm

To run the frontend, you need to have Node.js and pnpm installed. You can download them from [here](https://nodejs.org/en/download/) and [here](https://pnpm.io/installation).

#### Setup Instructions

1. Install dependencies:

   ```bash
   cd frontend
   pnpm install
   ```

2. Create and configure environment file:

   ```bash
   # Create .env.local file
   touch .env.local

   # Add the following configuration to .env.local
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

### Running Tests

#### Backend Tests

```bash
cd backend
php artisan test --filter=Unit
```

#### Frontend Tests

```bash
cd frontend
pnpm run test
```


## 📝 Project Notes

- The repository follows name-blind recruitment rules (no personal information).
- TDD, accessibility, and GOV.UK principles have been prioritised in both UI and API architecture.
