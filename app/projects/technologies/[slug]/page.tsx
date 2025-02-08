import Projects from "@/components/projects";
import { projectsData } from "@/components/data/projects-data";
import BlurIn from "@/components/magicui/blurin";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Helper function to normalize technology names
  const normalizeTechName = (name: string) => {
    return name.toLowerCase()
      .replace(/dotjs/i,'.js') // remove the 'dot' from the name
      .replace(/\./g, '') // Remove all dots
      .replace(/\s+/g, '');// Remove all whitespace
  };

  const projectsWithTag = projectsData.filter((project) =>
    project.technologies.some(
      (tech) => normalizeTechName(tech) === normalizeTechName(slug)
    )
  );

  // Clean up the display name by removing 'dotjs'
  const displayName = slug.replace(/dotjs/i, '.js').replace(/dot/i, '.');

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
            Projects using {displayName}
          </BlurIn>
        </div>
      </div>
      <div className="container mx-auto px-4 mb-16">
        <Projects projectsData={projectsWithTag} />
      </div>
    </main>
  );
}
