import { PageInfo } from "../typings";
import { urlFor } from "../sanity";

export default function About({ pageInfo }: { pageInfo: PageInfo }) {
  return (
    <div className="section-shell max-w-7xl">
      <h2 id="about-title" className="section-title">About</h2>
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {pageInfo.profilePic?.asset && <img src={urlFor(pageInfo.profilePic).width(800).height(800).url()} alt={`${pageInfo.name}, ${pageInfo.role}`} width={400} height={400} loading="lazy" className="w-48 h-48 md:w-72 md:h-72 xl:w-96 xl:h-96 rounded-full md:rounded-lg object-cover shrink-0" />}
        <div className="space-y-6 text-center md:text-left min-w-0">
          <h3 className="text-3xl sm:text-4xl font-semibold">Here is a <span className="underline decoration-[#F7AB0A]/50">little</span> background</h3>
          <p className="text-base leading-relaxed whitespace-pre-line break-words">{pageInfo.backgroundInformation}</p>
        </div>
      </div>
    </div>
  );
}
