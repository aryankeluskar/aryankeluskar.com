import { HomePage } from "@/components/home-page";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: DATA.name,
  description: DATA.description,
};

export default function Page() {
  return <HomePage />;
}
