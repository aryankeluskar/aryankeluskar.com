import * as React from "react";

import { cn } from "@/lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
};

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  ref?: React.Ref<HTMLHeadingElement>;
};

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
  ref?: React.Ref<HTMLParagraphElement>;
};

function Card({ className, ref, ...props }: DivProps) {
  return (
    <div
      ref={ref}
      className={cn("rounded-lg bg-card text-card-foreground", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ref, ...props }: DivProps) {
  return <div ref={ref} className={cn("flex flex-col", className)} {...props} />;
}

function CardTitle({ className, ref, children, ...props }: HeadingProps) {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function CardDescription({ className, ref, ...props }: ParagraphProps) {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({ className, ref, ...props }: DivProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "text-pretty font-sans text-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ref, ...props }: DivProps) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center pt-2", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
