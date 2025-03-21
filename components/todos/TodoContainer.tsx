'use client'; // Next.js App Router client component directive

import React, { useState } from 'react';
import { ITodo } from '@/types';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

interface TodoContainerProps {
  initialTodos?: ITodo[];
}

export default function TodoContainer({
  initialTodos = [],
}: TodoContainerProps) {
  const [todos, setTodos] = useState<ITodo[]>(initialTodos);

  // Handler for creating a new todo
  const handleCreateTodo = async (title: string, description?: string) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to create todo');
      }

      // Add new todo to state
      setTodos((prevTodos) => [data.data, ...prevTodos]);
    } catch (err) {
      console.error('Error creating todo:', err);
      throw err;
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to update todo');
      }
      // Update the todo in state
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? data.data : todo))
      );
    } catch (err) {
      console.error('Error updating todo:', err);
      throw err;
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to delete todo');
      }

      // Remove the deleted todo from state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      throw err;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Add New Todo
        </h2>
        <TodoForm onSubmit={handleCreateTodo} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Your Todos
        </h2>
        <TodoList
          todos={todos}
          onDelete={handleDeleteTodo}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  );
}
