import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/db/mongodb';
import Todo from '@/models/todo';
import { updateTodoSchema } from '@/validation/todo';
import { TodoResponse } from '@/types';

/**
 * GET /api/todos/[id] - Get a specific todo by ID
 *
 * NEXTJS SPECIFIC:
 * - Route parameters come from the folder structure [id]
 * - Params are passed as function arguments (not req.params like in Express)
 * - No router.get('/todos/:id') needed - file path defines the route
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<TodoResponse>> {
  try {
    const { id } = params;

    // Connect to MongoDB
    await connectToMongoDB();

    // Find todo by ID
    const todo = await Todo.findById(id);

    // If todo not found, return 404
    if (!todo) {
      return NextResponse.json(
        {
          success: false,
          message: 'Todo not found',
          data: null,
        },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error(`Error in GET /api/todos/[id]:`, error);

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve todo',
        data: null,
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/todos/[id] - Update a specific todo
 *
 * NEXTJS SPECIFIC:
 * - Function name defines HTTP method (PUT)
 * - No middleware system like in Express
 * - Params passed directly to the function
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<TodoResponse>> {
  try {
    const { id } = params;
    const body = await request.json();

    // Validate update data
    const validationResult = updateTodoSchema.safeParse(body);
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

    // Find and update todo, returning the updated document
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      validationResult.data,
      { new: true } // Return updated document
    );

    // If todo not found, return 404
    if (!updatedTodo) {
      return NextResponse.json(
        {
          success: false,
          message: 'Todo not found',
          data: null,
        },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo,
    });
  } catch (error) {
    console.error(`Error in PUT /api/todos/[id]:`, error);

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update todo',
        data: null,
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/todos/[id] - Delete a specific todo
 *
 * NEXTJS SPECIFIC:
 * - Function name defined as HTTP method
 * - URL parameters come from directory structure
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<TodoResponse>> {
  try {
    const { id } = params;

    // Connect to MongoDB
    await connectToMongoDB();

    // Find and delete todo
    const deletedTodo = await Todo.findByIdAndDelete(id);

    // If todo not found, return 404
    if (!deletedTodo) {
      return NextResponse.json(
        {
          success: false,
          message: 'Todo not found',
          data: null,
        },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json({
      success: true,
      message: 'Todo deleted successfully',
      data: deletedTodo,
    });
  } catch (error) {
    console.error(`Error in DELETE /api/todos/[id]:`, error);

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete todo',
        data: null,
      },
      { status: 500 }
    );
  }
}
