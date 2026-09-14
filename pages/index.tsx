import type { GetStaticProps } from "next";
import Link from "next/link";
import Seo from "../components/Seo";
import About from "../components/About";
import ContactMe from "../components/ContactMe";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import WorkExperience from "../components/WorkExperience";
import { Experience, PageInfo, Project, Skill, Social } from "../typings";
import { fetchExperiences } from "../utils/fetchExperiences";
import { fetchPageInfo } from "../utils/fetchPageInfo";
import { fetchProjects } from "../utils/fetchProjects";
import { fetchSkills } from "../utils/fetchSkills";
import { fetchSocials } from "../utils/fetchSocials";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
};

const Home = ({ pageInfo, experiences, projects, skills, socials }: Props) => {
  return (
    <div className="min-h-screen bg-[rgb(36,36,36)] text-white">
      <Seo pageInfo={pageInfo} />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header socials={socials} />
      <main id="main-content" tabIndex={-1}>
        <section id="hero" aria-label="Introduction">
          <Hero pageInfo={pageInfo} />
        </section>
        <section id="about" aria-labelledby="about-title">
          <About pageInfo={pageInfo} />
        </section>
        <section id="experience" aria-labelledby="experience-title">
          <WorkExperience experiences={experiences} />
        </section>
        <section id="skills" aria-labelledby="skills-title">
          <Skills skills={skills} />
        </section>
        <section id="projects" aria-labelledby="projects-title">
          <Projects projects={projects} />
        </section>
        <section id="contact" aria-labelledby="contact-title">
          <ContactMe pageInfo={pageInfo} />
        </section>
      </main>
      <footer className="flex justify-center py-8">
        <Link href="#hero">
          <a className="heroButton">Back to top ↑</a>
        </Link>
      </footer>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [pageInfo, experiences, skills, projects, socials] = await Promise.all([
    fetchPageInfo(), fetchExperiences(), fetchSkills(), fetchProjects(), fetchSocials(),
  ]);
  if (!pageInfo) return { notFound: true, revalidate: 60 };

  return {
    props: {
      pageInfo,
      experiences,
      skills,
      projects,
      socials,
    },
    revalidate: 60,
  };
};
