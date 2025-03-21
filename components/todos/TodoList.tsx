'use client'; // Next.js App Router client component directive

import React, { useState } from 'react';
import { ITodo } from '@/types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: ITodo[];
  onDelete: (id: string) => Promise<void>;
  onToggleComplete: (id: string, completed: boolean) => Promise<void>;
}

export default function TodoList({
  todos,
  onDelete,
  onToggleComplete,
}: TodoListProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('');

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        Loading todos...
      </div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <div className="p-4 text-center text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  // If no todos, show empty state
  if (todos.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          No todos yet
        </h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Create your first todo to get started.
        </p>
      </div>
    );
  }

  // Render the list of todos
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}
