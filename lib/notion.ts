import { Client } from "@notionhq/client";
import { env } from "./env";
import { cache } from 'react'
import { NotionBlogsSchema } from "./notion.dtypes";

export const notion = new Client({
  auth: env.NOTION_API_KEY,
});

export const fetchBlogs = cache(async () => {
  console.log("Fetching blogs");
  const response = await notion.databases.query({
    database_id: env.NOTION_DATABASE_ID!,
    filter: {
      property: "Status",
      status: {
        equals: "Published",
      },
    },
  });
  // Validate the response
  console.log("Response received at:", new Date().toISOString());
  const validatedBlogs = NotionBlogsSchema.parse(response.results);
  return validatedBlogs;
});