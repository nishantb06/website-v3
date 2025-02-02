import { NotionBlog } from "@/lib/notion.dtypes";

export default function BlogCard({ blog }: { blog: NotionBlog }) {
  return <div>
    <h1>{blog.properties.Title.title[0].plain_text}</h1>
  </div>
}