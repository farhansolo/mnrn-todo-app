# MNRN Stack Todo App

A modern todo application built with MongoDB, Next.js, React, and Node.js (MNRN stack) using TypeScript.

## Project Overview

This project is a Todo application that demonstrates best practices for building a full-stack application with:

- **MongoDB**: NoSQL database for storing todo items
- **Next.js**: React framework with server-side rendering
- **React**: UI library for building the frontend
- **Node.js**: JavaScript runtime (integrated with Next.js)
- **TypeScript**: For type safety across the entire stack
- **Tailwind CSS**: For styling components

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── api/              # API routes (Server Components)
│   │   └── todos/        # Todo API endpoints
│   │       └── route.ts  # RESTful API endpoints for todos collection
│   │       └── [id]/     # Dynamic routes for individual todos
│   │           └── route.ts # GET, PUT, DELETE for individual todos
│   ├── page.tsx          # Main page component (Client Component)
│   └── layout.tsx        # Root layout with metadata and global styles
├── components/           # React components
│   ├── ui/               # Reusable UI components (buttons, inputs, etc.)
│   └── todos/            # Todo-specific components (TodoList, TodoItem, etc.)
├── lib/                  # Utility libraries and helpers
│   └── db/               # Database utilities
│       └── mongodb.ts    # MongoDB connection with caching mechanism
├── models/               # Data models (Mongoose schemas)
│   └── todo.ts           # Todo model with validation
├── types/                # TypeScript type definitions
│   └── index.ts          # Shared types (Todo, API responses, etc.)
├── validation/           # Input validation schemas
│   └── todo.ts           # Zod schemas for todo validation
└── config/               # Application configuration
    └── env.ts            # Environment variables with Zod validation
```

## Key Features

- **Type Safety**: End-to-end TypeScript for better developer experience
- **ESM Modules**: Using modern ES modules syntax throughout
- **API Routes**: RESTful API with Next.js API routes
- **Input Validation**: Schema validation with Zod
- **Database**: MongoDB with Mongoose ODM
- **Responsive UI**: Modern UI with Tailwind CSS
- **Dark Mode Support**: Automatic dark/light theme switching

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Run the development server:
   ```
   npm run dev
   ```
5. Open http://localhost:3000 in your browser

## Development Guidelines

- Follow ESM module syntax
- Use TypeScript for all files
- Validate inputs with Zod schemas
- Follow the folder structure for organization
- Use Tailwind CSS for styling components

## API Endpoints

### Todos Collection

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo

### Individual Todo

- `GET /api/todos/[id]` - Get a specific todo
- `PUT /api/todos/[id]` - Update a specific todo
- `DELETE /api/todos/[id]` - Delete a specific todo

## Technologies Used

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Type Safety**: TypeScript
- **Validation**: Zod
- **State Management**: React Hooks
- **Authentication**: (Future implementation)

## Learning Objectives

This project serves as a learning tool for:

1. Next.js App Router architecture
2. TypeScript best practices
3. Modern React patterns with hooks
4. API development with Next.js
5. MongoDB/Mongoose integration
6. ESM modules
7. Tailwind CSS styling

## Future Enhancements

- User authentication
- Todo categories and tags
- Due dates and reminders
- Search and filtering
- Sorting options
- Drag and drop reordering
