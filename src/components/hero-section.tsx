import { DATA } from "@/data/resume";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <div className="relative mx-auto w-full max-w-2xl space-y-8 pt-16 pb-6">
        <div className="gap-2 flex justify-between">
          <div className="flex-col flex flex-1 space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-solway">
              {`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
            </h1>
            <p className="max-w-[600px] md:text-xl">
              {DATA.description}
            </p>
            <p className="max-w-[600px] md:text-xl">
                {DATA.description2}
            </p>
          </div>
          <Avatar className="size-28 border">
            <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
            <AvatarFallback>{DATA.initials}</AvatarFallback>
          </Avatar>
        </div>

        {/* Navigation Buttons */}
        <div className="flex pt-10">
          <Link 
            href={DATA.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nameButtons px-[3vw] py-[1.5vh] mx-[1vw] font-solway font-semibold text-[2.3vh] text-black bg-[rgba(0,255,75,0.33)] hover:bg-[rgba(0,255,75,0.5)] transition-colors"
          >
            resume
          </Link>
          <Link 
            href="#projects"
            className="nameButtons px-[3vw] py-[1.5vh] mx-[1vw] font-solway font-semibold text-[2.3vh] text-black bg-[rgba(24,0,255,0.33)] hover:bg-[rgba(24,0,255,0.5)] transition-colors"
          >
            projects
          </Link>
          <Link 
            href="#contact"
            className="nameButtons px-[3vw] py-[1.5vh] mx-[1vw] font-solway font-semibold text-[2.3vh] text-black bg-[rgba(255,0,0,0.33)] hover:bg-[rgba(255,0,0,0.5)] transition-colors"
          >
            contact
          </Link>
        </div>
      </div>
    </section>
  );
} 