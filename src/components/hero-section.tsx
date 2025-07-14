import { DATA } from "@/data/resume";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Markdown from "react-markdown";

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <div className="relative mx-auto w-full max-w-2xl space-y-8 pt-16 pb-6">
        <div className="gap-2 flex justify-between">
          <div className="flex-col flex flex-1 space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-solway">
              {`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
            </h1>
            <div className="max-w-[600px] md:text-xl">
              <Markdown className="prose max-w-full w-fit text-pretty font-sans dark:prose-invert bg-white mb-4">
                {DATA.description}
              </Markdown>
            </div>
            <div className="max-w-[600px] md:text-xl">
              <Markdown className="prose max-w-full text-pretty font-sans dark:prose-invert">
                {DATA.current}
              </Markdown>
            </div>
            {/* <p className="max-w-[600px] md:text-xl">
                {DATA.description2}
            </p> */}
          </div>
          <Avatar className="size-28 border">
            <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
            <AvatarFallback>{DATA.initials}</AvatarFallback>
          </Avatar>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-4 pt-10">
          <Link
            href={DATA.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-11 py-2.5 font-solway font-semibold text-sm sm:text-base text-foreground bg-[rgba(0,255,75,0.33)] hover:bg-[rgba(0,255,75,0.5)] transition-colors "
          >
            resume
          </Link>
          <Link
            href="#projects"
            className="px-11 py-2.5 font-solway font-semibold text-sm sm:text-base text-foreground bg-[rgba(24,0,255,0.33)] hover:bg-[rgba(24,0,255,0.5)] transition-colors "
          >
            projects
          </Link>
          <Link
            href="#contact"
            className="px-11 py-2.5 font-solway font-semibold text-sm sm:text-base text-foreground bg-[rgba(255,0,0,0.33)] hover:bg-[rgba(255,0,0,0.5)] transition-colors "
          >
            contact
          </Link>
        </div>
      </div>
    </section>
  );
}
