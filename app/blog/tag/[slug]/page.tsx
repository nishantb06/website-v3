import { fetchBlogs } from "@/lib/notion";
import {BlogCard} from "@/components/blog-card";
import BlurIn from "@/components/magicui/blurin";

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogs = await fetchBlogs();
  const blogsWithTag = blogs.filter((blog) => blog.tags.includes(slug));
  // return (
  //   <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)">
  //     <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
  //       <h1 className="text-2xl font-bold">Blogs with tag: {slug}</h1>
  //       <BlogList blogs={blogsWithTag} />
  //     </main>
  //   </div>
  // );
  return (
    <div className="py-4 mx-auto max-w-2xl ">
      <div className="container mx-auto px-4 py-4">
        <div className="text-5xl font-bold">
          <BlurIn duration={0.5} className="h-full">
            Nishant&apos;s Tech Blog
          </BlurIn>
        </div>
        <div className="text-xl text-neutral-500 dark:text-neutral-400">
          <BlurIn duration={0.5} className="h-full">
            Blogs with tag: {slug}
          </BlurIn>
        </div>
      </div>
      {/* <div className="flex justify-center w-full pt-4 pb-10">
          <div className="flex w-7/1">
          <CommandDemo onSearchChange={setSearchValue} />
        </div>
      </div>
      <div className="flex justify-start">
        <ToggleGroupDemo onToggleChange={setToggleValue} />
      </div>
      <div className="flex min-h-screen border-t border-l border-r border-gray-200">
        <p>Showing {toggleValue}, related to {searchValue}</p>
      </div> */}
      <div>
        {blogsWithTag.map((blog) => (
          <BlogCard 
            key={blog.id} 
            slug={blog.slug} 
            coverImage= {blog.cover}
            title={blog.title} 
            subtitle={blog.subtitle} 
            tags={blog.tags}
            date={blog.date}
          />
        ))}
      </div>
    </div>
  );
}
