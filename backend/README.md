# HMCTS Task Manager Challenge

A simple task management system built for the HMCTS developer challenge. It allows users to create, view, update, and delete tasks with a clean and user-friendly interface.

This project is built using **Next.js** with **Tailwind CSS**, **Shadcn UI**, and **React Hook Form** for the frontend, and **Laravel API** with **PostgreSQL** for the backend.

---

## 🔧 Features

-   Create, read, update, and delete tasks
-   View task details
-   Form validation with Zod and React Hook Form
-   Status selection (Pending, In Progress, Completed)
-   Visual feedback using Sonner
-   Accessible UI components (Radix + Shadcn)

---

## 📦 Tech Stack

### Backend (Laravel)

-   Laravel 12
-   PHP 8.2
-   Laravel API + Sanctum
-   PostgreSQL
-   PHPUnit

## 🧪 API Endpoints

-   `POST /api/tasks` – create a task
-   `GET /api/tasks` – list all tasks
-   `GET /api/tasks/{id}` – get a single task
-   `PUT /api/tasks/{id}` – update a task
-   `DELETE /api/tasks/{id}` – delete a task

---

## 🚀 Installation

### Backend

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

### Running tests (Backend)

```bash
cd backend
php artisan test
```
