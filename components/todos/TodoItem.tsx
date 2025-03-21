'use client'; // Next.js App Router client component directive

import React, { useState } from 'react';
import { ITodo } from '@/types';
import Button from '@/components/ui/Button';

interface TodoItemProps {
  todo: ITodo;
  onDelete: (id: string) => Promise<void>;
  onToggleComplete: (id: string, completed: boolean) => Promise<void>;
}

export default function TodoItem({
  todo,
  onDelete,
  onToggleComplete,
}: TodoItemProps) {
  // Loading states for actions
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Format date helper
  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle toggle complete
  const handleToggleComplete = async () => {
    try {
      setIsUpdating(true);
      await onToggleComplete(todo._id!, !todo.completed);
    } catch (err) {
      console.error('Failed to update todo:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(todo._id!);
    } catch (err) {
      console.error('Failed to delete todo:', err);
      setIsDeleting(false);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow transition">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {/* Checkbox for completion status */}
          <div className="pt-0.5">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
              disabled={isUpdating}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          {/* Todo content */}
          <div>
            <h3
              className={`font-medium ${
                todo.completed
                  ? 'line-through text-gray-500 dark:text-gray-400'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {todo.title}
            </h3>

            {todo.description && (
              <p
                className={`mt-1 text-sm ${
                  todo.completed
                    ? 'text-gray-400 dark:text-gray-500'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {todo.description}
              </p>
            )}

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Created: {formatDate(todo.createdAt)}
              {todo.updatedAt &&
                Math.abs(
                  new Date(todo.updatedAt).getTime() -
                    new Date(todo.createdAt!).getTime()
                ) > 1000 && <> · Updated: {formatDate(todo.updatedAt)}</>}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            isLoading={isDeleting}
            loadingText="Deleting..."
            aria-label="Delete todo"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
