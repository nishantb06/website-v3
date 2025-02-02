import { z } from "zod";

// Basic schemas
const UserSchema = z.object({
  object: z.literal("user"),
  id: z.string(),
});

const RichTextItemSchema = z.object({
  type: z.literal("text"),
  text: z.object({
    content: z.string(),
    link: z.null(),
  }),
  annotations: z.object({
    bold: z.boolean(),
    italic: z.boolean(),
    strikethrough: z.boolean(),
    underline: z.boolean(),
    code: z.boolean(),
    color: z.string(),
  }),
  plain_text: z.string(),
  href: z.null(),
});

const DateSchema = z.object({
  start: z.string(),
  end: z.null(),
  time_zone: z.null(),
});

const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

// Cover schema
const CoverSchema = z.union([
  z.object({
    type: z.literal("external"),
    external: z.object({
      url: z.string(),
    }),
  }),
  z.object({
    type: z.literal("file"),
    file: z.object({
      url: z.string(),
      expiry_time: z.string(),
    }),
  }),
  z.null(),
]);

// Properties schema
const PropertiesSchema = z.object({
  Status: z.object({
    id: z.string(),
    type: z.literal("status"),
    status: z.object({
      id: z.string(),
      name: z.string(),
      color: z.string(),
    }),
  }),
  Subtitle: z.object({
    id: z.string(),
    type: z.literal("rich_text"),
    rich_text: z.array(RichTextItemSchema),
  }),
  Tags: z.object({
    id: z.string(),
    type: z.literal("multi_select"),
    multi_select: z.array(TagSchema),
  }),
  slug: z.object({
    id: z.string(),
    type: z.literal("rich_text"),
    rich_text: z.array(RichTextItemSchema),
  }),
  Date: z.object({
    id: z.string(),
    type: z.literal("date"),
    date: DateSchema,
  }),
  Title: z.object({
    id: z.string(),
    type: z.literal("title"),
    title: z.array(RichTextItemSchema),
  }),
});

// Main blog page schema
export const NotionBlogSchema = z.object({
  object: z.literal("page"),
  id: z.string(),
  created_time: z.string(),
  last_edited_time: z.string(),
  created_by: UserSchema,
  last_edited_by: UserSchema,
  cover: CoverSchema,
  icon: z.null(),
  parent: z.object({
    type: z.literal("database_id"),
    database_id: z.string(),
  }),
  archived: z.boolean(),
  in_trash: z.boolean(),
  properties: PropertiesSchema,
  url: z.string(),
  public_url: z.union([z.string(), z.null()]),
});

export const NotionBlogsSchema = z.array(NotionBlogSchema);

// Export types
export type NotionBlog = z.infer<typeof NotionBlogSchema>;
export type NotionBlogs = z.infer<typeof NotionBlogsSchema>;
