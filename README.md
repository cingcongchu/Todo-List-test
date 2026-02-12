# Todo List Application

A modern, clean-code Todo List application built with Next.js, Prisma ORM, and SQLite.

## Features

-  Create, Read, Update, Delete (CRUD) operations
-  Toggle todo completion status
-  Add descriptions, start dates, and deadlines
-  Two-column layout: Active and Completed tasks
-  Responsive design with Tailwind CSS
-  Persistent storage with SQLite

## Project Structure 

```
todolist-app/
├── prisma/
│   ├── dev.db              # SQLite database file
│   └── schema.prisma       # Database schema definition
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── todos/
│   │   │       ├── route.ts          # API endpoints (GET, POST)
│   │   │       └── [id]/
│   │   │           └── route.ts      # API endpoints (GET, PUT, DELETE)
│   │   ├── components/
│   │   │   ├── TodoList.tsx          # Main container component
│   │   │   ├── TodoCard.tsx          # Individual todo display
│   │   │   ├── TodoForm.tsx          # Form for creating todos
│   │   │   ├── TodoColumn.tsx        # Column for todo groups
│   │   │   ├── TodoStats.tsx         # Statistics display
│   │   │   ├── ErrorMessage.tsx      # Error notification
│   │   │   └── LoadingSpinner.tsx    # Loading indicator
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Home page
│   ├── constants/
│   │   └── index.ts                 # Application constants
│   ├── hooks/
│   │   └── useTodos.ts              # Custom React hook for todos
│   ├── lib/
│   │   ├── prisma.ts                # Prisma client configuration
│   │   └── utils.ts                 # Utility functions
│   ├── services/
│   │   └── todoApi.ts               # API service layer
│   └── types/
│       └── todo.ts                  # TypeScript type definitions
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

### Prerequisites
- Node.js 18+
- npm or yarn

## Installation

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Setup Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Or manually create `.env` file with this content:

```env
DATABASE_URL="file:./prisma/dev.db"
```

### Step 3: Generate Prisma Client

```bash
npx prisma generate
```

### Step 4: Run Database Migrations

```bash
npx prisma migrate dev --name init
```

### Step 5: Start the Development Server

```bash
npm run dev
```

## Database Schema

```prisma
model Todo {
  id          Int       @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean   @default(false)
  startDate   DateTime?
  deadline    DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite
- **ORM**: Prisma
- **State Management**: React Hooks

