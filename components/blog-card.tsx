import { CleanBlog } from "@/lib/notion.dtypes";


export default function BlogCard(blog: CleanBlog) {
  return <div>
    <h1>{blog.title}</h1>
  </div>
}