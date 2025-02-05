import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import BlurIn from "./magicui/blurin";


const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

const projectsData = [
  {
    title: "WandB duplicate",
    description:
      "Demo frontend that lets you monitor your training runs, just like Weights and Biases!",
    link: "https://form-vibe.vercel.app/",
    code: "https://github.com/yatharth1706/FormVibe",
    previewVideo: `${S3_BASE_URL}/wandb-duplicate.mov`,
    technologies: [
      "Next.js",
      "React",
      "Appwrite",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "Reading Stack",
    description:
      " Chrome extension that helps you manage your active reading list with ease. ",
    link: "https://github.com/yatharth1706/EmojiGit",
    code: "https://github.com/yatharth1706/EmojiGit",
    previewVideo: `${S3_BASE_URL}/reading-stack-video.mov`,
    technologies: ["JavaScript", "Node.js", "Git", "Emoji", "Meow", "Inquirer"],
  },
  {
    title: "SmolLM",
    description:
      "Reverse Engineering of SmolLM-V2 and building a sample frontend for it.",
    link: "https://github.com/yatharth1706/SmolLM",
    code: "https://github.com/yatharth1706/SmolLM",
    previewVideo: `${S3_BASE_URL}/demo-dockercompose-application.mov`,
    technologies: [
      "Next.js",
      "React",
      "MongoDB",
      "Express",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "Hindi Tokenizer",
    description:
      "A tokenizer for the Hindi language, trained from scratch with Byte-Pair Encoding algorithm.",
    link: "/projects",
    code: "https://github.com/yatharth1706/Hindi-Tokenizer",
    previewImage: "/images/hindi-bpe.png",
    technologies: [
      "Next.js",
      "React",
      "MongoDB",
      "Express",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
];

function Projects() {
  return (
    <div className="flex flex-col gap-4 w-full">
        <div className="container mx-auto px-4 py-4">
        <div className="text-5xl font-bold">
          <BlurIn duration={0.5} className="h-full">
            Projects
          </BlurIn>
        </div>
        <div className="text-xl text-neutral-500 dark:text-neutral-400">
          <BlurIn duration={0.5} className="h-full">
            Musings and prototypes
          </BlurIn>
        </div>
      </div>
      <BlurIn duration={0.5} className="h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectsData.map((project, index) => (
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
                    <span
                        key={index}
                        className="bg-slate-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                    >
                        {technology}
                    </span>
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