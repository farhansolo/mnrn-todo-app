import mongoose from 'mongoose';

/**
 * Global variables interface to track MongoDB connection status
 */
interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Initialize the global connection object with proper type
declare global {
  var mongooseConnection: MongooseConnection | undefined;
}

// Initialize global connection cache if it doesn't exist
if (!global.mongooseConnection) {
  global.mongooseConnection = {
    conn: null,
    promise: null,
  };
}

/**
 * Connect to MongoDB with connection caching
 * This prevents multiple connections in development mode
 */
export async function connectToMongoDB() {
  // If we already have a connection, return it
  if (global.mongooseConnection?.conn) {
    return global.mongooseConnection.conn;
  }

  // If we don't have a connection promise yet, create one
  if (!global.mongooseConnection?.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Get the connection string from environment variables
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    global.mongooseConnection!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ Connected to MongoDB');
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ Error connecting to MongoDB:', error);
        throw error;
      });
  }

  // Wait for the connection and cache it
  global.mongooseConnection!.conn = await global.mongooseConnection!.promise;
  return global.mongooseConnection!.conn;
}
