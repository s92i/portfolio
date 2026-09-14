import { Experience } from "../typings";
import { urlFor } from "../sanity";

function displayDate(date: string) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
}

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="flex flex-col gap-6 rounded-lg bg-[#292929] p-6 sm:p-8 min-w-0">
      {experience.companyImage?.asset && <img src={urlFor(experience.companyImage).width(160).height(160).url()} alt={`${experience.company} logo`} width={80} height={80} loading="lazy" className="w-20 h-20 rounded-full object-cover" />}
      <div className="min-w-0">
        <h3 className="text-2xl sm:text-3xl font-light break-words">{experience.jobTitle}</h3>
        <p className="font-bold text-xl mt-2">{experience.company}</p>
        <div className="flex flex-wrap gap-3 my-4">
          {experience.technologies?.filter(Boolean).map(technology => technology.image?.asset && <img key={technology._id} className="h-10 w-10 object-contain" src={urlFor(technology.image).width(80).height(80).url()} alt={`${technology.title} logo`} width={40} height={40} loading="lazy" />)}
        </div>
        <p className="text-sm text-gray-300 mb-5">
          {displayDate(experience.dateStarted)} – {experience.isCurrentlyWorkingHere ? "Present" : displayDate(experience.dateEnded)}
        </p>
        <ul className="list-disc space-y-3 pl-5 leading-relaxed break-words">
          {experience.points?.map((point, index) => <li key={index}>{point}</li>)}
        </ul>
      </div>
    </article>
  );
}
