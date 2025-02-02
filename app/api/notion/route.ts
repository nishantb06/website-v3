import { env } from "@/lib/env"

export async function GET() {
  // Your environment variables are now type-safe and validated
  const notionApiKey = env.NOTION_API_KEY;
  const notionDatabaseId = env.NOTION_DATABASE_ID;

  // Use the variables...
} 