import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Seo from "../../components/Seo";
import { sanityClient, urlFor } from "../../sanity";
import { PageInfo, Project } from "../../typings";
import { fetchPageInfo } from "../../utils/fetchPageInfo";

type Props = { project: Project; pageInfo: PageInfo };

export default function ProjectPage({ project, pageInfo }: Props) {
  const description = project.summary?.trim() || `Explore ${project.title}, a project by ${pageInfo.name}, including its technologies and live demo.`;
  return (
    <>
      <Seo pageInfo={pageInfo} title={`${project.title} | ${pageInfo.name}`} description={description} image={project.image} imageAlt={`Screenshot of ${project.title}`} path={`/projects/${encodeURIComponent(project._id)}`} />
      <a href="#project-content" className="skip-link">Skip to content</a>
      <header className="max-w-5xl mx-auto px-5 pt-8">
        <Link href="/#projects"><a className="heroButton">← All projects</a></Link>
      </header>
      <main id="project-content" tabIndex={-1} className="section-shell max-w-5xl">
        <h1 className="text-3xl sm:text-5xl font-semibold break-words">{project.title}</h1>
        {project.image?.asset && <img src={urlFor(project.image).width(1440).url()} alt={`Screenshot of ${project.title}`} className="w-full rounded-xl" />}
        <ul aria-label="Technologies used" className="flex flex-wrap gap-3">
          {project.technologies?.filter(Boolean).map(technology => <li key={technology._id} className="rounded-full border border-gray-500 px-4 py-2">{technology.title}</li>)}
        </ul>
        <p className="text-lg leading-relaxed whitespace-pre-line break-words">{project.summary}</p>
        <div className="flex flex-wrap gap-4">
          {project.linkToBuild && <a href={project.linkToBuild} target="_blank" rel="noopener noreferrer" className="heroButton" aria-label={`View ${project.title} live demo (opens in a new tab)`}>Live demo ↗</a>}
          <Link href="/#contact"><a className="heroButton">Discuss a project</a></Link>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await sanityClient.fetch<{ _id: string }[]>('*[_type == "project"]{_id}');
  return { paths: projects.map(project => ({ params: { id: project._id } })), fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (typeof params?.id !== "string") return { notFound: true, revalidate: 60 };
  const [project, pageInfo] = await Promise.all([
    sanityClient.fetch<Project | null>('*[_type == "project" && _id == $id][0]{..., technologies[]->}', { id: params.id }),
    fetchPageInfo(),
  ]);
  if (!project || !pageInfo) return { notFound: true, revalidate: 60 };
  return { props: { project, pageInfo }, revalidate: 60 };
};
