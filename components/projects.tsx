import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import BlurIn from "./magicui/blurin";

interface Project {
  title: string;
  description: string;
  previewVideo?: string;
  previewImage?: string;
  technologies: string[];
  link: string;
  code: string;
}

interface ProjectsProps {
  projectsData: Project[];
}

function Projects({ projectsData }: ProjectsProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <BlurIn duration={0.5} className="h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectsData.map((project: Project, index: number) => (
            <div
                key={index}
                className="flex flex-col border rounded-md dark:border-gray-700"
            >
                {project.previewVideo ? (
                  <video
                    src={project.previewVideo}
                    autoPlay
                    muted
                    loop
                    preload="auto"
                    className="rounded-t-md"
                  />
                ) : (
                  <img
                    src={project.previewImage}
                    alt={project.title}
                    className="rounded-t-md"
                  />
                )}
                <div className="flex flex-col gap-3 p-4 grow">
                <h2 className="text-xl font-bold">{project.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-[4px]">
                    {project.technologies.map((technology, index) => (
                      <Link 
                        key={index}
                        href={`/projects/technologies/${technology}`}
                      >
                        <span
                        className="bg-slate-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                        >
                          {technology}
                        </span>
                      </Link>
                    ))}
                </div>
                <div className="flex gap-2 mt-auto">
                    <Link href={project.link}>
                    <Button variant="default">View</Button>
                    </Link>
                    <Link href={project.code}>
                    <Button variant="outline">Code</Button>
                    </Link>
                </div>
                </div>
            </div>
            ))}
        </div>
      </BlurIn>
    </div>
  );
}

export default Projects;