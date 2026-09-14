import ExperienceCard from "./ExperienceCard";
import { Experience } from "../typings";

export default function WorkExperience({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="section-shell max-w-7xl">
      <h2 id="experience-title" className="section-title">Experience</h2>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {[...experiences].sort((a, b) => b.dateStarted.localeCompare(a.dateStarted)).map(experience => <ExperienceCard key={experience._id} experience={experience} />)}
      </div>
    </div>
  );
}
