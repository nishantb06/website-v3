import { fetchBlogs } from "@/lib/notion";
import { CleanBlog } from "@/lib/notion.dtypes";
import Link from "next/link";
import BlogCard  from "@/components/blog-card";

function BlogList({ blogs }: { blogs: CleanBlog[] }) {
  return (
    <div className="flex flex-col gap-8">
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link href={`/blog/${blog.slug}`}>
            <BlogCard {...blog} />
          </Link>
        </div>
        ))}
    </div>
  );
}

export default async function TagPage({ params }: { params: { slug: string } }) {
  const blogs = await fetchBlogs();
  const blogsWithTag = blogs.filter((blog) => blog.tags.includes(params.slug));
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Blogs with tag: {params.slug}</h1>
        <BlogList blogs={blogsWithTag} />
      </main>
    </div>
  );
}
