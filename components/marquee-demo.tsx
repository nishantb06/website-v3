import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    title: "How to write backfills scripts at work",
    slug: "backfill-scripts",
    subtitle: "Avoid these 5 mistakes while running backfill scripts",
    img: "https://www.notion.so/images/page-cover/solid_red.png",
  },
  {
    title: "Diving into Jetson Nano",
    slug: "jetson-nano",
    subtitle: "Setting up a jetson nano",
    img: "https://www.notion.so/images/page-cover/webb3.jpg",
  },
  {
    title: "All about PyTorch Tensors",
    slug: "all-about-pytorch-tensors",
    subtitle: "The inner workings of PyTorch Tensors",
    img: "https://www.notion.so/images/page-cover/met_william_morris_1878.jpg",
  },
  {
    title: "Cross Entropy from Scratch!",
    slug: "cross-entropy-from-scratch",
    subtitle: "Duplicate Pytorch’s implementation of Cross Entropy loss",
    img: "https://www.notion.so/images/page-cover/woodcuts_3.jpg",
  },
  {
    title: "Compressing LLM’s with Low Rank Decomposition",
    slug: "rom-for-compressing-llms",
    subtitle: "Tricks for Compressing Large Language Models",
    img: "https://www.notion.so/images/page-cover/met_paul_signac.jpg",
  },
  {
    title: "The Annotated LLaMA",
    slug: "the-annotated-llama",
    subtitle: "Complete code breakdown of the LLama Architecture",
    img: "https://images.unsplash.com/photo-1572297982753-48c028401d18",
  },
];

// const firstRow = reviews.slice(0, reviews.length / 2);
// const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  title,
  slug,
  subtitle,
}: {
  img: string;
  title: string;
  slug: string;
  subtitle: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-full cursor-pointer overflow-hidden rounded-xl border p-4 shadow",
        // light styles
        "border-gray-150/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
        <a href={`/blog/${slug}`}>
            <div className="flex flex-row items-center gap-2">
            <img className="rounded-full" width="32" height="32" alt="" src={img} />
            <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">
                {title}
                </figcaption>
            </div>
            </div>
        </a>
      <blockquote className="mt-2 text-sm text-gray-400 dark:text-gray-300">{subtitle}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex  w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
      <Marquee pauseOnHover vertical className="[--duration:20s] ">
        {reviews.map((review) => (
          <ReviewCard key={review.slug} {...review} />
        ))}
      </Marquee>
      {/* <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee> */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
