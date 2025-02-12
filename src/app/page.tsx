"use client";

import { HackathonCard } from "@/components/hackathon-card";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { HeroSection } from "@/components/hero-section";
import { HometownSection } from "@/components/hometown-section";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Page() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects ? DATA.projects : DATA.projects.slice(0, 4);

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <HeroSection />
      <section id="about">
        <h2 className="text-xl font-bold font-solway">About</h2>
        <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
          {DATA.summary}
        </Markdown>
      </section>
      <HometownSection />
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">Work Experience</h2>
          {DATA.work.map((work) => (
            <ResumeCard
              key={work.company}
              logoUrl={work.logoUrl}
              altText={work.company}
              title={work.company}
              subtitle={work.title}
              href={work.href}
              badges={work.badges}
              period={`${work.start} - ${work.end ?? "Present"}`}
              description={work.description}
            />
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">Education</h2>
          {DATA.education.map((education) => (
            <ResumeCard
              key={education.school}
              href={education.href}
              logoUrl={education.logoUrl}
              altText={education.school}
              title={education.school}
              subtitle={education.degree}
              period={`${education.start} - ${education.end}`}
            />
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">Skills & Tech Stack</h2>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                My Projects
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Check out my latest work
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I&apos;ve worked on a variety of projects, from simple
                websites to complex web applications. Here are a few of my
                favorites.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {visibleProjects.map((project) => (
              <ProjectCard
                href={project.href}
                key={project.title}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                {...(project.image && { image: project.image })}
                {...(project.video && { video: project.video })}
                {...(project.links && { links: project.links })}
              />
            ))}
          </div>
          {DATA.projects.length > 4 && (
            <div className="flex justify-center mt-8 mb-0">
              <Button
                variant="ghost"
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="gap-2 hover:bg-transparent"
              >
                {showAllProjects ? (
                  <>
                    Show Less
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show More ({DATA.projects.length - 4})
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </section>
      <section id="hackathons">
        <div className="space-y-12 w-full pb-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Hackathons
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                I like hacking things <span className="whitespace-nowrap">(a lot)</span>
              </h2>
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                During my time in university, I attended{" "}
                {DATA.hackathons.length}+ hackathons. It was eye-opening to see the endless possibilities
                brought to life by a group of motivated and passionate
                individuals within 2-3 days. I have made some of my best friends and memories at these hackathons :)
              </p>
            </div>
          </div>
          <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
            {DATA.hackathons.map((project) => (
              <HackathonCard
                key={project.title}
                title={project.title}
                {...(project.description && { description: project.description })}
                {...(project.dates && { dates: project.dates })}
                {...(project.location && { location: project.location })}
                {...(project.image && { image: project.image })}
                {...(project.links && { links: project.links })}
              />
            ))}
          </ul>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              Contact
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Want to chat? Just shoot me a text{" "}
              <Link
                href={DATA.contact.social.Twitter.url}
                className="text-blue-500 hover:underline"
              >
                on twitter
              </Link>{" "}
              or email me directly at{" "}
              <Link
                href={`mailto:${DATA.contact.email}`}
                className="text-blue-500 hover:underline"
              >
                {DATA.contact.email}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
