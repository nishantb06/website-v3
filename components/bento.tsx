/* eslint-disable react/jsx-no-undef */
"use client";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import BlurIn from "./magicui/blurin";
import { FadeIn } from "./magicui/fade-in";
import Image from "next/image";
import Hero from "./hero";
import { RetroGrid } from "./magicui/retro-grid";
// import Technologies from "./technologies";
import { GithubCal } from "./github-calendar";
import { DATA } from "./data/resume";
import BlurFade from "./magicui/blur-fade";
import { ResumeCard } from "./resume-card";
// import { MarqueeDemo } from "./marquee-blogs";
import { motion } from "framer-motion";
import { Marquee } from "./magicui/marquee";
import { defaultDomains } from "./data/default-domains";
import { cn } from "@/lib/utils";
// import { RippleCard } from "./ui/ripper-card";
import { AnimatedBeamMultipleOutputs } from "./animated-beam-multiple-outputs";
import { BlogsMarqueeVertical } from "./blogs-marquee-vertical";
// import ProjectPosts from "./project-posts";
const BLUR_FADE_DELAY = 0.04;

const features = [
  {
    Icon: "",
    name: "",
    description: "",
    href: "",
    cta: "",
    className: "col-span-3 md:col-span-2",
    background: (
      <>
        <div
          id="hero"
          className="absolute right-0 top-0 h-full w-full border-none transition-all duration-300 ease-out"
        >
          <Hero />
        </div>

        <div className="absolute right-0 top-0 z-50">
          {/* <FadeIn direction="down">
            <ThemeToggle />
          </FadeIn> */}
        </div>
      </>
    ),
  },
  {
    Icon: "",
    name: "I'm Nishant",
    description: "ML Engineer focused on building LLM, Computer Vision systems",
    className: "col-span-3 md:col-span-1",
    href: `/projects`,
    cta: "Visit portfolio",
    background: (
      <div>
        <div className="absolute right-0 top-0 h-3/4 w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_5%,#000_50%)] group-hover:scale-105">
          <BlurIn duration={0.5} className="h-full">
            <Image
              className="object-cover object-center h-full w-full"
              src="/images/nishant.jpg"
              alt="avatar image"
              width={200}
              height={200}
              priority // Load image immediately
              quality={75} // Adjust quality for optimization
              placeholder="blur" // Placeholder to improve perceived performance
              blurDataURL="data:image/svg+xml;base64,..." // Use a small base64-encoded placeholder image
            />
          </BlurIn>
        </div>

        <FadeIn
          direction="right"
          framerProps={{
            show: { transition: { delay: 1.5 } },
          }}
        >
          <a
            href={
              process.env.NEXT_PUBLIC_AVAILABLE_FOR_FREELANCE == "true"
                ? `${process.env.NEXT_PUBLIC_DISCORD}`
                : "#contact-form"
            }
            className="absolute top-2 right-2 bg-background rounded-lg px-4 py-2 text-xs text-neutral-500 dark:text-neutral-300 max-w-3/4 w-fit"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full animate-pulse ${
                  process.env.NEXT_PUBLIC_AVAILABLE_FOR_FREELANCE == "true"
                    ? "bg-emerald-400"
                    : "bg-yellow-400"
                }`}
              ></div>
              <div className="">
                {process.env.NEXT_PUBLIC_AVAILABLE_FOR_FREELANCE == "true"
                  ? "available"
                  : "on engagement"}
              </div>
            </div>
          </a>
        </FadeIn>
      </div>
    ),
  },
  // {
  //   Icon: "",
  //   name: "Technologies",
  //   description:
  //     "Using a combination of cutting-edge, and time-tested technologies.",
  //   href: "/technologies",
  //   cta: "View all technologies",
  //   className: "md:col-span-1 md:row-span-1",
  //   background: (
  //     <div className="absolute right-0 top-0 w-[80%] origin-top translate-x-0 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_70%)] md:[mask-image:linear-gradient(to_top,transparent_50%,#000_70%)] group-hover:-translate-y-5 group-hover:scale-105">
  //       <FadeIn direction="up">
  //         <Technologies />
  //       </FadeIn>
  //     </div>
  //   ),
  // },
  {
    Icon: "",
    name: "Tech Domain",
    description: "Sector-agnostic, focused on solving problems with code.",
    href: `/projects`,
    cta: "View projects",
    className: "md:col-span-1 md:row-span-1",
    background: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
      >
        <Marquee
          className="absolute h-2/3 top-10 [--duration:40s] [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] w-full"
          pauseOnHover
        >
          {defaultDomains.map((f, idx) => (
            <a
              href={`${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/tags/${f.slug}`}
              key={idx}
              className={cn(
                "relative w-40 h-full cursor-pointer overflow-hidden rounded-xl border p-4 hover:-translate-y-1",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                "transform-gpu transition-all duration-300 ease-out hover:blur-none"
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                  <figcaption className="text-lg font-bold dark:text-white ">
                    {f.name}
                  </figcaption>
                </div>
              </div>
              <blockquote className="mt-2 text-xs">{f.body}</blockquote>
            </a>
          ))}
        </Marquee>
      </motion.div>
    ),
  },
  {
    Icon: "",
    name: "AI Integrations",
    description:
      "Generative UIs, LLMs, Transformers, Chatbots, Classification, and more.",
    href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/tags/ai`,
    cta: "Visit AI projects",
    className: "col-span-3 md:col-span-2",
    background: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <AnimatedBeamMultipleOutputs className="absolute right-0 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] md:[mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] group-hover:scale-105" />
      </motion.div>
    ),
  },
  {
    Icon: "",
    name: "",
    description: "",
    href: "",
    cta: "",
    className: "md:row-span-1 md:col-span-2",
    background: (
      <section id="work" className="flex flex-col p-5">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
    ),
  },
  // {
  //   Icon: "",
  //   name: "Blogs",
  //   description: "",
  //   href: "/blog",
  //   cta: "Read more",
  //   className: "col-span-1 md:col-span-1",
  //   background: <MarqueeDemo />,
  // },
  // {
  //   Icon: "",
  //   name: "",
  //   description: "",
  //   href: "",
  //   cta: "",
  //   className: "col-span-3 md:col-span-1",
  //   background: (
  //     <div className="absolute h-full w-full left-0 top-0 origin-top rounded-md transition-all duration-300 ease-out group-hover:scale-[105%]">
  //       <div className="absolute h-full w-full [mask-image:linear-gradient(to_top,transparent_20%,#000_70%)]">
  //         <div className="absolute h-full w-full [mask-image:linear-gradient(to_bottom,transparent_2%,#000_10%)]">
  //           <RippleCard />
  //         </div>
  //       </div>
  //     </div>
  //   ),
  // },
  {
    Icon: "",
    name: "Writings",
    description:
      "Writings on ML, Engineering, and more.",
    className: "md:row-span-2 md:col-span-1",
    href: `/blog`,
    cta: "View all Blogs",
    background: (
      <div className="absolute h-full w-full left-0 top-0 origin-top rounded-md transition-all duration-300 ease-out group-hover:scale-[102%]">
        <div className="absolute h-full w-full [mask-image:linear-gradient(to_top,transparent_20%,#000_70%)]">
          <div className="absolute h-full w-full [mask-image:linear-gradient(to_bottom,transparent_2%,#000_10%)]">
            <div className="text-7xl font-semibold w-full flex justify-center items-center h-2/3 transition-all duration-300">
              <div className="flex items-center gap-2">
                <BlogsMarqueeVertical />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: "",
    name: "GitHub Calendar",
    description: "contributions across repositories",
    href: "https://github.com/nishantb06",
    cta: "Go to Github",
    className: "col-span-3 md:col-span-2",
    background: (
      <FadeIn direction="up">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <GithubCal />
        </div>
      </FadeIn>
    ),
  },

  {
    Icon: "",
    name: "",
    description: "",
    href: "",
    cta: "",
    className: "col-span-3 md:col-span-3",
    background: (
      <div
        id="contact-form"
        className="absolute h-full w-full left-0 top-0 origin-top rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_0%)]"
      >
        <div className="absolute inset-0 z-50 flex justify-center items-center gap-5 p-5">
          <div className="max-w-sm w-full flex flex-col gap-2">
            <div className="text-5xl md:text-6xl font-semibold text-neutral-700 dark:text-neutral-300 w-full flex justify-start">
              <BlurIn duration={0.5} className="h-full">
                Get in touch.
              </BlurIn>
            </div>
            <div className="w-full flex justify-center text-neutral-500 dark:text-neutral-400">
              Shoot a dm on X or send an email to get the conversation started.
              I&apos;ll be in touch soon.
            </div>
            {/* <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              *Your email will never be shared with anyone.
            </div> */}
            <div className="">{/* <EmailForm /> */}</div>
          </div>
        </div>

        <RetroGrid />
      </div>
    ),
  },
];

export function Bento() {
  return (
    <>
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </>
  );
}
