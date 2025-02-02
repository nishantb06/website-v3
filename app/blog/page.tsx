import BlogCard from "@/components/blog-card";
import { fetchBlogs } from "@/lib/notion";

export default async function Blog() {
    const blogs = await fetchBlogs();
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)">
            <h1 className="text-2xl font-bold">Nishant's Blog</h1>
            {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
    )
}