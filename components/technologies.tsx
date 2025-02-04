import React from "react";
import { IconCloud } from "./magicui/icon-cloud";

const slugs = [
  "amazonaws",
  "apache",
  "apple",
  "archlinux",
  "docker",
  "scylla",
  "freebsd",
  "git",
  "github",
  "gitlab",
  "graphql",
  "huggingface",
  "jira",
  "javascript",
  "kalilinux",
  "linux",
  "linode",
  "mongodb",
  "mysql",
  "nextdotjs",
  "nginx",
  "nodedotjs",
  "numpy",
  "openai",
  "pandas",
  "pocketbase",
  "postgresql",
  "prisma",
  "python",
  "pytorch",
  "react",
  "redis",
  "tailwindcss",
  "typescript",
  "ubuntu",
  "zod",
  "golang",
];

interface TechnologiesProps {
  liveLinks?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Technologies({ liveLinks = false }: TechnologiesProps) {
  return (
    <div className="">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}
