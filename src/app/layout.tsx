import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Solway } from "next/font/google";
import "./globals.css";
import { BlueprintGrid } from "@/components/blueprint-grid";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const solway = Solway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-solway",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  icons: {
    icon: "/some pfp.webp",
    shortcut: "/some pfp.webp",
    apple: "/some pfp.webp",
  },
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="19f7b60d-c6ba-468a-8f90-25fe1473c03c"
          strategy="afterInteractive"
        />
        {/* <!-- Primary Meta Tags --> */}
          <title>Aryan Keluskar</title>
          <meta name="title" content="Aryan Keluskar" />
          <meta name="description" content="19, building fast backends, scalable language models, and iOS apps. I live to learn, create, and ship. Experienced in full-stack development, machine learning, and data analysis." />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://aryankeluskar.com/" />
          <meta property="og:title" content="Aryan Keluskar" />
          <meta property="og:description" content="19, building fast backends, scalable language models, and iOS apps. I live to learn, create, and ship. Experienced in full-stack development, machine learning, and data analysis." />
          <meta property="og:image" content="https://aryankeluskar.com/banner.webp" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://aryankeluskar.com/" />
          <meta property="twitter:title" content="Aryan Keluskar" />
          <meta property="twitter:description" content="19, building fast backends, scalable language models, and iOS apps. I live to learn, create, and ship. Experienced in full-stack development, machine learning, and data analysis." />
          <meta property="twitter:image" content="https://aryankeluskar.com/banner.webp" />

      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable,
          solway.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <BlueprintGrid />
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
