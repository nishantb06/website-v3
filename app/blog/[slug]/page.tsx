import BlurIn from "@/components/magicui/blurin";
import { NotionPageRenderer } from "@/components/notion-page-renderer";
import { fetchBlogBySlug, fetchBlogs, getNotionPage } from "@/lib/notion";
import { NotionBlog } from "@/lib/notion.dtypes";
import { notFound } from "next/navigation";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";

export async function generateStaticParams() {
  const blogs = await fetchBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}


export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const {slug} = await params;
  const blog: NotionBlog = await fetchBlogBySlug(slug);
  if (!blog) {
    notFound();
  }
  const pageId = blog.id.replace(/-/g, '');
  const recordMap = await getNotionPage(pageId);
  return (
    <div className="mx-auto">
      {blog.cover?.type === 'external' && (
        <div className="w-full h-[300px] relative mb-8">
          <img
            src={blog.cover.external.url}
            alt="Blog cover"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-white px-4 text-center">
              {blog.properties.Title.title[0].plain_text}
            </h1>
            <p className="text-xl text-white mt-4">
              {blog.properties.Subtitle.rich_text[0]?.plain_text}
            </p>
          </div>
        </div>
      )}
      <div className="max-w-3xl mx-auto justify-left">
        <div style={{ maxWidth: 768 }}>
          <BlurIn duration={0.5} className="h-full">
            <NotionPageRenderer recordMap={recordMap} />
          </BlurIn>
        </div>
      </div>
    </div>
  );
}


