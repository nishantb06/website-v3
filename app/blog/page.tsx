'use server'

// import { useState } from "react";
// import { ToggleGroupDemo } from "@/components/blog-toggle";
// import { CommandDemo } from "@/components/search";
import BlurIn from "@/components/magicui/blurin";
import { fetchBlogs } from "@/lib/notion";

import { BlogCard } from "@/components/blog-card";
import { CleanBlogs } from "@/lib/notion.dtypes";

export default async function Blog() {
  // const [toggleValue, setToggleValue] = useState("blogs");
  // const [searchValue, setSearchValue] = useState("");

  const blogs: CleanBlogs = await fetchBlogs();
  // const slugToId = await getSlugToIdMap();

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
            Writings on Engineering, AI, and more.
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
        {blogs.map((blog) => (
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
