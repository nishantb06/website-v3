'use server'


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

const ProjectPosts = async () => {
  try {
    // const blogs = await fetchBlogs();
    const blogs = DEFAULT_PROJECTS;
    const formattedBlogs = blogs.map((blog) => ({
      name: blog.name,
      slug: blog.slug,
      body: blog.body,
      image: blog.image,
    }));

    return <ProjectShowcaseVertical projects={formattedBlogs} />;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return <ProjectShowcaseVertical projects={DEFAULT_PROJECTS} />;
  }
};

export default ProjectPosts;