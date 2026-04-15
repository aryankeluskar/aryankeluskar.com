"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="px-2 relative"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:text-neutral-200 transition-[opacity,transform,filter] duration-300 dark:opacity-0 dark:scale-[0.25] dark:blur-[4px] opacity-100 scale-100 blur-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] text-neutral-800 dark:text-neutral-200 transition-[opacity,transform,filter] duration-300 opacity-0 scale-[0.25] blur-[4px] dark:opacity-100 dark:scale-100 dark:blur-0" />
    </Button>
  );
}
