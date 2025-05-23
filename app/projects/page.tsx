import Projects from "@/components/projects";
import { projectsData } from "@/components/data/projects-data";
import BlurIn from "@/components/magicui/blurin";
export default function ProjectsPage() {
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
            Musings and prototypes
          </BlurIn>
        </div>
      </div>
      <div className="container mx-auto px-4 mb-16">
        <Projects projectsData={projectsData} />
      </div>
    </main>
  );
}
