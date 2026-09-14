import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { urlFor } from "../sanity";
import { PageInfo } from "../typings";
import BackgroundCircles from "./BackgroundCircles";

function AnimatedGreeting({ name }: { name: string }) {
  const [text] = useTypewriter({ words: [`Hi, my name is ${name}`, "Guy-who-loves-coffee.tsx", "<ButLovesCodingMore />"], loop: true, delaySpeed: 2000 });
  return <span aria-hidden="true">{text}<Cursor cursorColor="#F7AB0A" /></span>;
}

export default function Hero({ pageInfo }: { pageInfo: PageInfo }) {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const animate = mounted && !reducedMotion;
  return (
    <div className="relative min-h-[80vh] flex flex-col gap-8 items-center justify-center text-center overflow-hidden px-5 py-16">
      <BackgroundCircles />
      {pageInfo.heroImage?.asset && <img src={urlFor(pageInfo.heroImage).width(256).height(256).url()} alt={`Portrait of ${pageInfo.name}`} width={128} height={128} className="relative rounded-full h-32 w-32 object-cover" />}
      <div className="z-10 w-full max-w-4xl">
        <p className="text-sm uppercase text-gray-300 pb-4 tracking-[0.2em]">{pageInfo.role}</p>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold min-h-[3em] break-words">
          <span className={animate ? "sr-only" : ""}>{`Hi, my name is ${pageInfo.name}`}</span>
          {animate && <AnimatedGreeting name={pageInfo.name} />}
        </h1>
        <nav aria-label="Portfolio sections" className="pt-5 flex flex-wrap justify-center gap-3">
          {["about", "experience", "skills", "projects"].map(section => <Link key={section} href={`#${section}`}><a className="heroButton">{section}</a></Link>)}
        </nav>
      </div>
    </div>
  );
}
