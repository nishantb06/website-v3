import { Client } from "@notionhq/client";
import { env } from "./env";
import { cache } from "react";
import {
  NotionBlogsSchema,
  CleanBlogSchema,
  NotionBlogSchema,
} from "./notion.dtypes";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: env.NOTION_API_KEY,
});

export const fetchBlogs = cache(async () => {
  const response = await notion.databases.query({
    database_id: env.NOTION_DATABASE_ID!,
    filter: {
      property: "Status",
      status: {
        equals: "Published",
      },
    },
  });

  const validatedBlogs = NotionBlogsSchema.parse(response.results);

  const blogs = validatedBlogs.map((blog) =>
    CleanBlogSchema.parse({
      id: blog.id,
      title: blog.properties.Title.title[0].plain_text,
      subtitle: blog.properties.Subtitle.rich_text[0].plain_text,
      date: blog.properties.Date.date.start,
      slug: blog.properties.slug.rich_text[0].plain_text,
      tags: blog.properties.Tags.multi_select.map((tag) => tag.name),
      status: blog.properties.Status.status.name,
      cover: blog.cover?.type === "external" ? blog.cover.external.url : blog.cover?.type === "file" ? blog.cover.file.url : "/images/default-blog.jpg",
    })
  );
  return blogs;
});

export const fetchBlogBySlug = cache(async (slug: string) => {
  const blog = await notion.databases
    .query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined);

  const validatedBlog = NotionBlogSchema.parse(blog);
  return validatedBlog;
});

export async function getNotionPage(notionPageId: string) {
  const data = await fetch(
    `https://notion-api.splitbee.io/v1/page/${notionPageId}`
  ).then((res) => res.json());

  return {
    props: {
      blockMap: data,
    },
  };
}
