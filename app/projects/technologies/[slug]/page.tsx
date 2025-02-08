import Projects from "@/components/projects";
import { projectsData } from "@/components/data/projects-data";
import BlurIn from "@/components/magicui/blurin";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectsWithTag = projectsData.filter((project) =>
    project.technologies.some(
      (tech) =>
        tech.toLowerCase().replace(/[\s\s.]/g, "") ===
        slug.toLowerCase().replace(/[\s\s.]/g, "") 
    )
  );
  return (
    <main className="min-h-screen max-w-5xl mx-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="text-5xl font-bold">
          <BlurIn duration={0.5} className="h-full">
            Projects
          </BlurIn>
        </div>
        <div className="text-xl text-neutral-500 dark:text-neutral-400">
          <BlurIn duration={0.5} className="h-full">
            Projects using {slug}
          </BlurIn>
        </div>
      </div>
      <div className="container mx-auto px-4 mb-16">
        <Projects projectsData={projectsWithTag} />
      </div>
    </main>
  );
}
