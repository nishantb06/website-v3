const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;
export const projectsData = [
  {
    title: "WandB duplicate",
    description:
      "Demo frontend that lets you monitor your training runs, just like Weights and Biases!",
    link: "https://github.com/nishantb06/wandb-duplicate",
    code: "https://github.com/nishantb06/wandb-duplicate",
    previewVideo: `${S3_BASE_URL}wandb-duplicate.mov`,
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Python",
      "Deep Learning",
    ],
  },
  {
    title: "Reading Stack",
    description:
      " Chrome extension that helps you manage your active reading list with ease. ",
    link: "https://github.com/nishantb06/readinglist",
    code: "https://github.com/nishantb06/readinglist",
    previewVideo: `${S3_BASE_URL}reading-stack-video.mov`,
    technologies: ["JavaScript", "Node.js"],
  },
  {
    title: "SmolLM",
    description:
      "Reverse Engineering of SmolLM-V2 and building a sample frontend for it.",
    link: "https://github.com/nishantb06/smolLM",
    code: "https://github.com/nishantb06/smolLM",
    previewVideo: `${S3_BASE_URL}demo-dockercompose-application.mov`,
    technologies: [
      "Python",
      "LLM",
      "Tokenizers",
      "NLP",
      "Transformers"
    ],
  },
  {
    title: "Hindi Tokenizer",
    description:
      "A tokenizer for the Hindi language, trained from scratch with Byte-Pair Encoding algorithm.",
    link: "https://github.com/nishantb06/byte-pair-encoding",
    code: "https://github.com/nishantb06/byte-pair-encoding",
    previewImage: "/images/hindi-bpe.png",
    technologies: [
      "Python",
      "LLM",
      "Tokenizers",
      "NLP",
    ],
  },
];