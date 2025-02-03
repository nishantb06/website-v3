'use server'


import { useState, useEffect } from "react";
import ProjectShowcaseVertical from "./project-showcase-verticle";
import { fetchBlogs } from "@/lib/notion";
// import { defaultDomains } from "./data/default-domains";

// Default projects data to use when Notion is not configured
const DEFAULT_PROJECTS = [
  {
    name: "Sample Project 1",
    slug: "sample-project-1",
    body: "A sample project description to demonstrate the layout",
    image: "/images/placeholder.jpg",
  },
  {
    name: "Sample Project 2",
    slug: "sample-project-2",
    body: "Another sample project with placeholder content",
    image: "/images/placeholder.jpg",
  },
  // Add more sample projects as needed...
];

const ProjectPosts = () => {
  const [blogs, setBlogs] = useState<any | null>(null);
  //   const [files, setFiles] = useState(defaultDomains);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogsData = await fetchBlogs();
        if (blogsData) {
          const formattedBlogs = blogsData.map((blog: any) => ({
            name: blog.title,
            slug: blog.slug,
            body: blog.subtitle,
            img: blog.cover,
          }));
          // setFiles(formattedPosts.slice(0, 10));
          setBlogs(formattedBlogs);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // If there's an error fetching from Notion, use default data
        console.log("Using default projects data");
        setBlogs(DEFAULT_PROJECTS);
      }
    };

    getBlogs();
  }, []);

  // Show default projects while loading or if blogs is null
  if (!blogs) {
    return <ProjectShowcaseVertical projects={DEFAULT_PROJECTS} />;
  }

  return <ProjectShowcaseVertical projects={blogs} />;
};

export default ProjectPosts;
