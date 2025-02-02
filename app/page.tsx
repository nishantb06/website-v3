import Footer from "./footer";
import BlogCard from "@/components/blog-card";
import { fetchBlogs } from "@/lib/notion";

export default async function Home() {
  const blogs = await fetchBlogs();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Nishant&apos;s Blog</h1>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
