// "use server";
// ProjectPosts.tsx

import { useState, useEffect } from "react";
import ProjectShowcaseVertical from "./project-showcase-verticle";
import { fetchBlogs } from "@/lib/notion";
// import { defaultDomains } from "./data/default-domains";

const ProjectPosts = () => {
  const [blogs, setBlogs] = useState<any | null>(null);
  //   const [files, setFiles] = useState(defaultDomains);

  useEffect(() => {
    const getBlogs = async () => {
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
    };

    getBlogs();
  }, []);

  return <ProjectShowcaseVertical projects={blogs} />;
};

export default ProjectPosts;
