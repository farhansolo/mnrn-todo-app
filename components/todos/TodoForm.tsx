'use client'; // Next.js App Router client component directive

import React, { useState } from 'react';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ITodo } from '@/types';
import { createTodoSchema } from '@/validation/todo';

interface TodoFormProps {
  onSubmit: (title: string, description?: string) => Promise<void>;
  initialData?: Partial<ITodo>;
  buttonText?: string;
}

export default function TodoForm({
  onSubmit,
  initialData = {},
  buttonText = 'Add Todo',
}: TodoFormProps) {
  // State for form values
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');

  // Loading state during form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Error handling
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data using the same schema as backend
      createTodoSchema.parse({
        title,
        description,
      });

      // Proceed with submission if validation passes
      setError('');
      setIsSubmitting(true);
      await onSubmit(title, description);

      // Reset form if it's a new todo
      if (!initialData._id) {
        setTitle('');
        setDescription('');
      }
    } catch (err) {
      // Handle Zod validation errors
      if (err instanceof z.ZodError) {
        // Get the first error message
        setError(err.errors[0].message);
      } else {
        // Handle other errors
        setError(err instanceof Error ? err.message : 'Failed to save todo');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-2 text-sm text-red-800 bg-red-100 rounded dark:bg-red-800/20 dark:text-red-400">
          {error}
        </div>
      )}

      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
        required
        fullWidth
        disabled={isSubmitting}
      />

      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
          Description (Optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow-sm rounded-md border border-gray-300 dark:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:text-white"
          rows={3}
          placeholder="Enter description"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
