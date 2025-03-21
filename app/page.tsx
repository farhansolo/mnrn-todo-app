import React from 'react';
import { connectToMongoDB } from '@/lib/db/mongodb';
import Todo from '@/models/todo';
import TodoContainer from '@/components/todos/TodoContainer';

// NEXT.JS SPECIFIC:
// This is a Server Component by default (no 'use client' directive)
// It fetches data on the server before rendering
export default async function HomePage() {
  try {
    // Connect to MongoDB
    await connectToMongoDB();

    // Fetch todos on the server
    const todos = await Todo.find({}).sort({ createdAt: -1 }).lean();

    // Convert MongoDB documents to plain objects and fix date serialization
    const serializedTodos = todos.map((todo) => ({
      ...todo,
      _id: todo._id.toString(),
      createdAt: todo.createdAt ? new Date(todo.createdAt) : undefined,
      updatedAt: todo.updatedAt ? new Date(todo.updatedAt) : undefined,
    }));

    return (
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          MNRN Todo App
        </h1>

        <TodoContainer initialTodos={serializedTodos} />
      </main>
    );
  } catch (error) {
    console.error('Error in HomePage:', error);

    return (
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          MNRN Todo App
        </h1>

        <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-lg">
          <h3 className="font-medium">Error loading todos</h3>
          <p>Please check your database connection and try again.</p>
        </div>
      </main>
    );
  }
}
