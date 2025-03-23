import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/db/mongodb';
import Todo from '@/models/todo';
import { createTodoSchema } from '@/validation/todo';
import { TodoResponse, TodosResponse } from '@/types';

export const dynamic = 'force-dynamic';

/**
 * GET /api/todos - Retrieve all todos
 *
 * NEXTJS SPECIFIC:
 * - Uses NextRequest/NextResponse instead of Express req/res
 * - Function name 'GET' matches the HTTP method (Next.js App Router convention)
 * - No explicit router setup needed (file-based routing)
 */
export async function GET(): Promise<NextResponse<TodosResponse>> {
  try {
    // Connect to MongoDB
    await connectToMongoDB();

    // Find all todos sorted by creation date (newest first)
    const todos = await Todo.find({}).sort({ createdAt: -1 });

    // Return successful response
    return NextResponse.json({
      success: true,
      data: todos,
    });
  } catch (error) {
    console.error('Error in GET /api/todos:', error);

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve todos',
        data: [],
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/todos - Create a new todo
 *
 * NEXTJS SPECIFIC:
 * - Function name 'POST' matches the HTTP method
 * - Uses NextRequest for type-safe request handling
 * - JSON parsing is handled automatically (unlike Express)
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<TodoResponse>> {
  try {
    // Get request body as JSON
    const body = await request.json();

    // Validate input using Zod schema
    const validationResult = createTodoSchema.safeParse(body);

    // If validation fails, return 400 Bad Request
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid todo data',
          data: null,
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToMongoDB();

    // Create new todo with validated data
    const newTodo = await Todo.create(validationResult.data);

    // Return successful response with created todo
    return NextResponse.json(
      {
        success: true,
        message: 'Todo created successfully',
        data: newTodo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/todos:', error);

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create todo',
        data: null,
      },
      { status: 500 }
    );
  }
}
