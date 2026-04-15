import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  logo?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  logo,
  links,
  className,
}: Props) {
  return (
    <Card
      className={
        "flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-out h-full shadow-[0_0_0_1px_rgba(0,0,0,.06),0_1px_3px_rgba(0,0,0,.1),0_2px_8px_rgba(0,0,0,.04)]"
      }
    >
      <div className="relative">
        <Link
          href={href || "#"}
          className={cn("block cursor-pointer", className)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-40 w-full object-cover object-top" // needed because random black line at bottom of video
            />
          )}
          {image && (
          <div className="">
            <Image
              src={image}
              alt={`${title} logo`}
              width={1000}
              height={1000}
              className="pointer-events-none mx-auto h-40 w-full object-cover object-top outline outline-1 outline-black/5"
            />
          </div>
        )}
        </Link>
      </div>
      <CardHeader className="px-2 pt-2">
        <div className="space-y-1">
          <div className="flex items-center w-full">
            <CardTitle className="mr-auto text-base">{title}</CardTitle>
            <div className="flex items-center space-x-2">
              {links?.map((link, idx) => (
                <Link
                  href={link?.href}
                  key={idx}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                    {link.icon}
                    {link.type}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <div style={{ marginTop: "8px" }}>
            <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
              {description}
            </Markdown>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2"></CardFooter>
    </Card>
  );
}
