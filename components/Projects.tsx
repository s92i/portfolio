import Link from "next/link";
import { Project } from "../typings";
import { urlFor } from "../sanity";

export default function Projects({ projects }: { projects: Project[] }) {
  const priority = (project: Project) => {
    if (project.technologies?.some(tech => tech?.title === "React")) return 1;
    if (project.technologies?.some(tech => tech?.title === "React Native")) return 2;
    return 3;
  };
  const sortedProjects = [...projects].sort((a, b) => priority(a) - priority(b));
  return (
    <div className="section-shell max-w-7xl">
      <h2 id="projects-title" className="section-title">Projects</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {sortedProjects.map(project => (
          <article key={project._id} className="flex flex-col gap-5 min-w-0 rounded-xl bg-[#292929] p-5 sm:p-7">
            <Link href={`/projects/${encodeURIComponent(project._id)}`}>
              <a aria-label={`View ${project.title} project details`}>
                {project.image?.asset && <img className="w-full aspect-video object-contain rounded-md" src={urlFor(project.image).width(960).url()} alt={`Screenshot of ${project.title}`} loading="lazy" />}
              </a>
            </Link>
            <h3 className="text-2xl font-semibold break-words">{project.title}</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies?.filter(Boolean).map(technology => technology.image?.asset && <img className="h-9 w-9 object-contain" key={technology._id} src={urlFor(technology.image).width(72).height(72).url()} alt={`${technology.title} logo`} width={36} height={36} loading="lazy" />)}
            </div>
            <p className="text-gray-200 leading-relaxed whitespace-pre-line break-words">{project.summary}</p>
            <div className="mt-auto flex flex-wrap gap-3 pt-2">
              <Link href={`/projects/${encodeURIComponent(project._id)}`}><a className="heroButton">Project details</a></Link>
              {project.linkToBuild && <a href={project.linkToBuild} target="_blank" rel="noopener noreferrer" className="heroButton" aria-label={`View ${project.title} live demo (opens in a new tab)`}>Live demo ↗</a>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
