import Skill from "./Skill";
import { Skill as SkillType } from "../typings";

export default function Skills({ skills }: { skills: SkillType[] }) {
  return (
    <div className="section-shell max-w-4xl">
      <h2 id="skills-title" className="section-title">Skills</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {skills.map(skill => <li key={skill._id}><Skill skill={skill} /></li>)}
      </ul>
    </div>
  );
}
