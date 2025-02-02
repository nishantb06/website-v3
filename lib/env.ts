import { z } from "zod";

const envSchema = z.object({
  NOTION_API_KEY: z.string().min(1),
  NOTION_DATABASE_ID: z.string().min(1),
});

/**
 * @description Validate environment variables
 */
function validateEnv() {
  try {
    const parsed = envSchema.parse({
      NOTION_API_KEY: process.env.NOTION_API_KEY,
      NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    });
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => err.path.join(".")).join(", ");
      throw new Error(
        `❌ Invalid environment variables: ${missingVars}\n` +
        `Please check your .env.local or .env.production file`
      );
    }
    throw error;
  }
}

export const env = validateEnv(); 