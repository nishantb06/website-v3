import { Client } from "@notionhq/client";
import { env } from "./env";
import { cache } from 'react'
import { NotionBlogsSchema, CleanBlogSchema } from "./notion.dtypes";

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
  const blogs = validatedBlogs.map((blog) => CleanBlogSchema.parse({
    id: blog.id,
    title: blog.properties.Title.title[0].plain_text,
    subtitle: blog.properties.Subtitle.rich_text[0].plain_text,
    date: blog.properties.Date.date.start,
    slug: blog.properties.slug.rich_text[0].plain_text,
    tags: blog.properties.Tags.multi_select,
      status: blog.properties.Status.status.name,
    })
  );
  console.log(blogs);
  return blogs;
});
