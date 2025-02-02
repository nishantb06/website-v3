import BlogCard from "@/components/blog-card";
import { fetchBlogs } from "@/lib/notion";
import Link from "next/link";
import { CleanBlog } from "@/lib/notion.dtypes";
import { Button } from "@/components/ui/button";

// Create a new BlogList component that takes blogs as props
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

export default async function Blog() {
  const blogs = await fetchBlogs();
  // create a list of tags and render them as buttons
  let tags = blogs.flatMap((blog) => blog.tags);
  tags = [...new Set(tags)];
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Nishant&apos;s Blog Page</h1>
        <BlogList blogs={blogs} />
        <div className="flex flex-col gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/blog/tag/${tag}`}>
              <Button>{tag}</Button>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
