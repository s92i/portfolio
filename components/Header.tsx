import { SocialIcon } from "react-social-icons";
import Link from "next/link";
import { Social } from "../typings";

export default function Header({ socials }: { socials: Social[] }) {
  return (
    <header className="sticky top-0 z-30 bg-[#242424]/95 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 max-w-7xl mx-auto px-5 py-3">
        <nav aria-label="Social profiles" className="flex flex-wrap min-w-0">
          {socials.map(social => <SocialIcon url={social.url} fgColor="#d1d5db" bgColor="transparent" label={social.title} key={social._id} />)}
        </nav>
        <Link href="/#contact"><a className="heroButton">Get in touch</a></Link>
      </div>
    </header>
  );
}
