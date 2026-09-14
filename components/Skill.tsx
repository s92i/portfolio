import { Skill as SkillType } from "../typings";
import { urlFor } from "../sanity";

export default function Skill({ skill }: { skill: SkillType }) {
  return (
    <div className="flex h-full flex-col items-center gap-3 rounded-lg bg-[#292929] p-4 text-center">
      {skill.image?.asset && <img className="h-12 w-12 object-contain" src={urlFor(skill.image).width(96).height(96).url()} alt={`${skill.title} logo`} width={48} height={48} loading="lazy" />}
      <p className="font-medium break-words max-w-full">{skill.title}</p>
      <p className="text-sm text-gray-300">Proficiency: {skill.progress}%</p>
    </div>
  );
}
