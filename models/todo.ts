import { Schema, model, Model, models } from 'mongoose';
import { ITodo } from '@/types';

/**
 * Mongoose schema for Todo documents
 * This defines the structure and validation rules for Todo documents in MongoDB
 */
const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'], // Validation with custom error message
      trim: true, // Automatically remove whitespace
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      trim: true, // Automatically remove whitespace
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    completed: {
      type: Boolean,
      default: false, // New todos are not completed by default
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

/**
 * Get Todo model (or create if it doesn't exist)
 * This pattern avoids model redefinition errors in development mode with hot reloading
 */
const Todo: Model<ITodo> = models.Todo || model<ITodo>('Todo', todoSchema);

export default Todo;
