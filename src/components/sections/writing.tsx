import { DATA } from "@/data/resume";
// import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Card components are no longer needed
import Image from "next/image"; // Image component is needed for thumbnails
import { LinkIcon, TrendingUp } from "lucide-react";
import React from "react";
import ReactMarkdown from 'react-markdown';

export function Writing() {
  return (
    <section id="publications" className="py-12">
      {" "}
      {/* Added py-12 for consistency with other sections */}
      <div className="flex justify-center mb-8">
        {" "}
        {/* Centered the heading block and added margin */}
        <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
          Writing
        </div>
      </div>
      <div className="flex w-full flex-col gap-6 md:gap-8">
        {" "}
        {/* Increased gap slightly */}
        {DATA.writing.map((writing, id) => (
          <div
            key={id}
            className="flex items-center justify-between w-full max-w-3xl mx-auto px-4 md:px-0 gap-4"
          >
            {" "}
            {/* Flex container with space between elements */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold leading-tight">
                <a
                  className="hover:underline"
                  href={writing.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {writing.title}
                </a>
              </h3>
              <div className="mt-2 text-sm">
                {" "}
                {/* Adjusted font size for readability */}
                {writing.preview && (
                  <div className="mt-1 text-sm font-normal text-muted-foreground">
                    <ReactMarkdown
                      components={{
                        a: ({ href, children, ...props }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-foreground transition-colors"
                            {...props}
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {writing.preview}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
            {writing.thumbnail && (
              <div className="flex-shrink-0">
                <a href={writing.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity duration-100 ease-in-out">
                  <Image
                    src={writing.thumbnail}
                    alt={writing.title}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover"
                  />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
