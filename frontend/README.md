# HMCTS Task Manager Challenge

A simple task management system built for the HMCTS developer challenge. It allows users to create, view, update, and delete tasks with a clean and user-friendly interface.

This project is built using **Next.js** with **Tailwind CSS**, **Shadcn UI**, and **React Hook Form** for the frontend, and **Laravel API** with **PostgreSQL** for the backend.

---

## 🔧 Features

- Create, read, update, and delete tasks
- View task details
- Form validation with Zod and React Hook Form
- Status selection (Pending, In Progress, Completed)
- Visual feedback using Sonner
- Accessible UI components (Radix + Shadcn)

---

## 📦 Tech Stack

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

- `POST /api/tasks` – create a task
- `GET /api/tasks` – list all tasks
- `GET /api/tasks/{id}` – get a single task
- `PUT /api/tasks/{id}` – update a task
- `DELETE /api/tasks/{id}` – delete a task

---

## 🚀 Installation

### Frontend

```bash
cd frontend
pnpm install
pnpm run dev
touch .env.local
add the following to .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Running tests (Frontend)

```bash
cd frontend
pnpm run test
```
