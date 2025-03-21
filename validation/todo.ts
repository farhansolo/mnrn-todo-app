import { z } from 'zod';

/**
 * Zod schema for creating a new todo
 * This validates the data structure when creating a new todo
 */
export const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required') // Must have at least 1 character
    .max(100, 'Title must be less than 100 characters'), // Maximum length
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(), // Optional field
  completed: z.boolean().default(false), // Default to false if not provided
});

/**
 * Zod schema for updating an existing todo
 * This validates the data structure when updating a todo
 * Notice all fields are optional since updates may be partial
 */
export const updateTodoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters')
    .optional(), // Optional for updates
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  completed: z.boolean().optional(), // Optional for updates
});

/**
 * Type inference from Zod schemas
 * These create TypeScript types based on the Zod schemas
 */
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
