import { z } from 'zod';

/**
 * Environment variables schema using Zod for validation
 * This ensures our app has the required environment variables
 */
const envSchema = z.object({
  MONGODB_URI: z.string().min(1).url(),
});

/**
 * Validate and export environment variables
 */
export const env = envSchema.parse({
  MONGODB_URI: process.env.MONGODB_URI,
});

/**
 * Validate environment variables
 * This function should be called on application startup
 */
export function validateEnv(): void {
  try {
    envSchema.parse({
      MONGODB_URI: process.env.MONGODB_URI,
    });
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    throw new Error('Invalid environment variables');
  }
}
