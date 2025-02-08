const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;
export const projectsData = [
  {
    title: "WandB duplicate",
    description:
      "Demo frontend that lets you monitor your training runs, just like Weights and Biases!",
    link: "https://form-vibe.vercel.app/",
    code: "https://github.com/yatharth1706/FormVibe",
    previewVideo: `${S3_BASE_URL}wandb-duplicate.mov`,
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
    previewVideo: `${S3_BASE_URL}reading-stack-video.mov`,
    technologies: ["JavaScript", "Node.js", "Git", "Emoji", "Meow", "Inquirer"],
  },
  {
    title: "SmolLM",
    description:
      "Reverse Engineering of SmolLM-V2 and building a sample frontend for it.",
    link: "https://github.com/yatharth1706/SmolLM",
    code: "https://github.com/yatharth1706/SmolLM",
    previewVideo: `${S3_BASE_URL}demo-dockercompose-application.mov`,
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