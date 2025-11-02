import { Icons } from "@/components/icons";
import {
  BriefcaseIcon,
  HomeIcon,
  HammerIcon,
  NotebookIcon,
} from "lucide-react";

type ProjectType = {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: string[];
  image?: string;
  video?: string;
  logo?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
};

type PublicationType = {
  title: string;
  href: string;
  authors: string[];
  venue: string;
  imageSrc?: string;
  contributionNote?: string;
  citation?: string;
  citationLink?: string;
  links?: readonly {
    icon?: React.ReactNode;
    title: string;
    href: string;
  }[];
};

type HackathonType = {
  title: string;
  project?: string;
  image?: string;
  dates?: string;
  location?: string;
  description?: string;
  links?: readonly {
    icon: React.ReactNode;
    title: string;
    href: string;
  }[];
};

export const DATA = {
  name: "Aryan Keluskar",
  initials: "AK",
  url: "https://aryankeluskar.com",
  resumeUrl: "https://dub.sh/aryans-resume",
  location: "Tempe, AZ",
  locationLink: "https://www.google.com/maps/place/tempe",
  description:
    "19, building fast backends, scalable language models, and iOS apps. I live to learn, create, and ship. Experienced in full-stack development, machine learning, and data analysis.",
  current:
    "Building [alice](https://dub.sh/wonderland) and [easywire](https://dub.sh/easywire).",
  summary1:
    "I love to solve problems, learn intricate concepts, and build products. Solving daunting & ambiguous problems demand clarity under chaos, thus I believe in creating intuitive interfaces and scalable engineering to solve them from first principles. I'm currently a computer science and statistics senior at ASU, while researching safety in large-language models.",
  summary2:
    "I grew up with a deep passion for mathematics, and use bayesian statistics to explain the world around me. I have won awards at collegiate hackathons such as HackMIT 2024 and SFHacks 2024. In my free time, I'm probably going down rabbit-holes or [cycling](https://www.strava.com/activities/13329957326) till I run out of roads.",
  // avatarUrl: "/professional.webp",
  avatarUrl: "/pfp.webp",
  hackathons: [
    {
      title: "CalHacks 2025",
      image: "/calhacks.png",
      dates: "October 2025",
      location: "Berkeley, CA",
      links: [
        {
          // icon: <Icons.devpost className="size-4" />,
          title: "Turing",
          href: "https://devpost.com/software/turing",
        },
      ],
      description:
        "Turing watches how you do tasks, how you reply to messages, how you work, and personalizes your computer-use agent so your workflows can be automated based on your patterns and habits."
    },
    {
      title: "HackMIT 2025",
      image: "/hackmit.png",
      dates: "September 2025",
      location: "Cambridge, MA",      
      links: [
        {
          // icon: <Icons.devpost className="size-4" />,
          title: "Flashback",
          href: "https://plume.hackmit.org/project/bcwzf-xiqcx-nbsvp-nxrhk",
        },
      ],
      description:
        "We built a RAG for videos and developed it with smart glasses as the base to create a social media platform. I worked on facial recognition and task matching algorithm using OpenCV and Modal's Compute Platform, so the RAG could match the user's contacts to the video content."
    },
    {
      title: "HackIllinois 2025 (Microgrant 🏆)",
      image: "/hackillinois.png",
      dates: "February 2025",
      location: "Urbana-Champaign, IL",
      description:
        "Built a chrome extension allowing researchers to learn more about the papers cited by simply hovering over the citations. Learned a ton about Model Context Protocol (MCPs) and PDF.js rendering engine.",
      links: [
        {
          // icon: <Icons.devpost className="size-4" />,
          title: "Alice",
          href: "https://dub.sh/wonderland",
        },
      ],
    },
    {
      title: "CalHacks 2024",
      // project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/calhacks.png",
      dates: "October 2024",
      location: "Berkeley, CA",
      description:
        "Built a full stack web-app that allows users to track their medication schedules. Designed a multi-modal Agentic AI System to check-in on patients and detect for potential side effects using sentiment analysis.",
      links: [
        {
          // icon: <Icons.devpost className="size-4" />,
          title: "CuraRx",
          href: "https://devpost.com/software/cura-rx",
        },
      ],
    },
    {
      title: "HackMIT 2024 (Sponsor Prize 🏆)",
      // project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/hackmit.png",
      description:
        "Awarded 1000$ in `Best Use of AI without an API`! Built a Python-Flask backend that uses Language Models to re-rank resumes and web-crawl to validate applicant resumes.",
      dates: "September 2024",
      location: "Cambridge, MA",
      links: [
        {
          // icon: <Icons.devpost className="size-4" />,
          title: "InsightHire",
          href: "https://www.linkedin.com/feed/update/urn:li:activity:7245228154615652352/",
        },
      ],
    },
    {
      title: "SFHacks 2024 (Sponsor Track 🏆)",
      // project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/sfhacks.png",
      description: "Won the Best Use of AI and VerbWire Track!",
      dates: "April 2024",
      location: "San Francisco, CA",
      links: [
        {
          // icon: <Icons.devpost className="size-4" />,
          title: "Soul of SF",
          href: "https://www.linkedin.com/feed/update/urn:li:activity:7186128731558588417/",
        },
      ],
    },
    {
      title: "LAHacks 2024",
      // project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/lahacks.png",
      description:
        "Built a full stack web-app designed to help individuals manage their groceries more efficiently. We aim to Minimize Waste & Maximize Taste.",
      dates: "April 2024",
      location: "Los Angeles, CA",
      links: [
        {
          // icon: <Icons.devpost className="size-4" />,
          title: "FreshUntil",
          href: "https://git.new/fresh",
        },
      ],
    },
    {
      title: "WiCS Coding Contest 2024 + HKD Code-a-thon 2024",
      image: "/wics.png",
      description:
        "Won 1st Place Undergraduate Team (out of 150+ participants) at WiCS and 1st Place Overall at HKD Code-a-thon. Both of these were Leetcode-style coding competitions with questions in Data Structures and Algorithms.",
      dates: "March 2024",
      location: "Tempe, AZ",
    },
    {
      title: "SunHacks 2023",
      // // project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/sunhacks.png",
      description:
        "Built a peer-to-peer equipment rental marketplace for students. Disqualified since I was too young (I mentored this hackathon the very next year. Talk about redemption).",
      dates: "November 2023",
      location: "Tempe, AZ",
      links: [
        {
          // icon: <Icons.devpost className="size-4" />,
          title: "TradeDaddy",
          href: "https://devpost.com/software/tradedaddy?ref_content=my-projects-tab&ref_feature=my_projects",
        },
      ],
    },
    {
      title: "AI in Education by ScaleU (Honorable Mention 🏆)",
      // project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/scaleup.png",
      // description: "Won the Best Use of Google Cloud Award",
      dates: "October 2023",
      location: "Scottsdale, AZ",
    },
    {
      title: "Opportunity Hack 2023 (Finalist)",
      // project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/opportunityhack.png",
      description: "Top 5 Finalist out of 100+ participants",
      dates: "October 2023",
      location: "Tempe, AZ",
    },
  ] as HackathonType[],
  publications: [
    {
      title:
        "Do LLMs Understand Ambiguity in Text? A Case Study in Open-world Question Answering",
      href: "https://ieeexplore.ieee.org/abstract/document/10825265",
      authors: ["<b>Aryan Keluskar</b>", "Amrita Bhattacharjee", "Huan Liu"],
      venue: "IEEE International Conference on Big Data 2024, Washington DC",
      citation: "13 citations",
      citationLink: "https://scholar.google.com/scholar?oi=bibs&hl=en1&cites=10776899312694291117&as_sdt=5",
      links: [
        {
          title: "Google Scholar",
          href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=wVDeZtcAAAAJ&authuser=1&citation_for_view=wVDeZtcAAAAJ:u5HHmVD_uO8C",
        },
        {
          title: "Tweet",
          href: "https://x.com/HEI/status/1859239058163085709",
        },
      ],
    },
    // {
    //   title:
    //     "Scikit-bio: a fundamental Python library for biological omic data analysis",
    //   href: "https://ieeexplore.ieee.org/abstract/document/10825265",
    //   venue: "",
    //   // citation: "100 citations",
    //   // citationLink: "https://scholar.google.com/scholar?oi=bibs&hl=en1&cites=10776899312694291117&as_sdt=5",
    //   links: [
    //     {
    //       title: "Google Scholar",
    //       href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=wVDeZtcAAAAJ&authuser=1&citation_for_view=wVDeZtcAAAAJ:u5HHmVD_uO8C",
    //     },
    //     {
    //       title: "Tweet",
    //       href: "https://x.com/HEI/status/1859239058163085709",
    //     },
    //   ],
    // },
    {
      title:
        "Tri-Accel: Curvature-Aware Precision-Adaptive and Memory-Elastic Optimization for Efficient GPU Usage",
      href: "https://arxiv.org/abs/2508.16905",
      venue: "arXiv preprint arXiv:2508.16905",
      // citation: "11 citations",
      // citationLink: "https://scholar.google.com/scholar?oi=bibs&hl=en1&cites=10776899312694291117&as_sdt=5",
      links: [
        {
          title: "Google Scholar",
          href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=wVDeZtcAAAAJ&authuser=1&citation_for_view=wVDeZtcAAAAJ:u-x6o8ySG0sC",
        },
        // {
        //   title: "Tweet",
        //   href: "https://x.com/HEI/status/1859239058163085709",
        // },
      ],
    },
  ] as PublicationType[],
  skills: [
    "Java",
    "C++",
    "Python",
    "JavaScript",
    "SQL",
    "C",
    "Julia",
    "Golang",
    "Prolog",
    "React.js",
    "Next.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "AWS",
    "GCP",
    "Docker",
    "Linux",
    "Git",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "#experience", icon: BriefcaseIcon, label: "Experience" },
    { href: "#projects", icon: HammerIcon, label: "Projects" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" }
  ],
  contact: {
    email: "contact@aryankeluskar.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://dub.sh/aryans-github",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://dub.sh/aryans-linkedin",
        icon: Icons.linkedin,
        navbar: true,
      },
      Twitter: {
        name: "Twitter",
        url: "https://dub.sh/aryans-twitter",
        icon: Icons.x,
        navbar: true,
      },
      Strava: {
        name: "Strava",
        url: "https://dub.sh/aryans-strava",
        icon: Icons.strava,
        navbar: true,
      },
      // "Google Scholar": {
      //   name: "Google Scholar",
      //   url: "https://scholar.google.com/citations?user=wVDeZtcAAAAJ&hl=en",
      //   icon: Icons.googleScholar,
      //   navbar: true
      // },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "HealthGC",
      href: "",
      badges: [],
      location: "Los Angeles, CA",
      title: "Artificial Intelligence Research Intern",
      logoUrl: "/healthgc.webp",
      start: "May 2025",
      end: "December 2025",
      description: (
        <>
          Seed-stage startup backed by the{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "var(--python-color, #306998)",
            }}
          >
            Floodgate
          </span>{" "}
          Fund. Building and optimizing large-language model pipelines for data
          processing, and developing state-of-the-art voice agents.
        </>
      ),
    },
    {
      company: "Data Mining and Machine Learning Lab",
      href: "https://dmml.asu.edu/",
      badges: [],
      location: "Arizona State University",
      title: "Machine Learning Researcher",
      logoUrl: "/cropped-asu-icon.webp",
      start: "April 2024",
      end: "Present",
      description: (
        <>
          Filtered text datasets with over a million rows and fine-tuned
          large-language models using{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "var(--python-color, #306998)",
            }}
          >
            Python
          </span>{" "}
          to improve comprehension of ambiguous human text, and co-authored an{" "}
          <span className="text-[#00629b] dark:text-[#0078d4]" style={{ fontWeight: "bold"}}>IEEE</span>{" "}
          BigData paper with Prof. Huan Liu and Dr. Amrita Bhattacharjee.
        </>
      ),
    },
    {
      company: "The Biodesign Institute",
      href: "https://scikit.bio",
      badges: [],
      location: "Arizona State University",
      title: "Software Engineering Intern",
      logoUrl: "/skbio.webp",
      start: "May 2024",
      end: "August 2024",
      description: (
        <>
          Saved over 75% in GPU costs (approximating {" "}
          <span style={{ fontWeight: "bold", color: "#3e9c35" }}>$3,850</span>
          ) and{" "}
          <span style={{ fontWeight: "bold", color: "#3e9c35" }}>6 weeks</span>{" "}
          in training and inference times by implementing Model Distillation and
          Flash Attention for Protein Language Models. Created benchmarking
          scripts using{" "}
          <span style={{ fontWeight: "bold", color: "#eb8f00" }}>
            HuggingFace
          </span>{" "}
          and{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "var(--python-color, #306998)",
            }}
          >
            Python
          </span>{" "}
          with PyTorch & Transformers libraries. Wrote unit tests to increase
          code coverage by 12.5%.
        </>
      ),
    },
    {
      company: "RCV Innovations",
      href: "https://rcvinnovations.com/",
      badges: [],
      location: "Remote",
      title: "Website Development Intern",
      logoUrl: "/rcv.webp",
      start: "June 2023",
      end: "July 2023",
      description: (
        <>
          Developed backend infrastructure for static assets and 3D models
          integration using{" "}
          <span className="text-[#306998] dark:text-[#4194d8]" style={{ fontWeight: "bold"}}>
            JavaScript
          </span>{" "}
          and{" "}
          <span className="text-[#269bdf] dark:text-[#0078d4]" style={{ fontWeight: "bold"}}>React.js</span>
          , yielding 46% surge in customer satisfaction. Created{" "}
          <span className="text-[#eb8f00] dark:text-[#ffb900]" style={{ fontWeight: "bold"}}>Power BI</span>{" "}
          dashboards and automated data collection using Google Analytics API,
          increasing click-through-rate by 29%.
        </>
      ),
    },
  ],
  education: [
    {
      school: "Arizona State University (Barrett Honors)",
      href: "https://asu.edu",
      degree: (
        <>
          <strong>BS in Computer Science</strong>, Minor in Statistics
        </>
      ),
      logoUrl: "/maroon.webp",
      start: "August 2023",
      end: "May 2026",
      description:
        "GPA: 3.94\nCoursework: Data Structures & Algorithms, Programming with C/C++, Computer Organization, Assembly, Object-Oriented Programming, Digital Design, Software Engineering, Operating Systems, Information Assurance.",
    },
    {
      school: "Buildspace",
      href: "https://buildspace.so",
      degree: "nights & weekends s5",
      logoUrl: "/buildspace.webp",
      start: "May 2024",
      end: "June 2024",
      description: "Completed the Full Stack Developer course.",
    },
  ],
  projects: [
    {
      title: "Alice",
      image: "/alice_banner.png",
      href: "https://dub.sh/wonderland",
      dates: "2025",
      active: true,
      description:
        "Browser Extension that provides instant context, summaries, and code for cited papers. Developed custom algorithms and optimized LLM pipelines to extract information from PDFs for **less than a cent**.",
      technologies: [
        "JavaScript",
        "TypeScript",
        "gulp.js",
        "Chrome",
        "HTML",
        "CSS",
        "Rest API",
        "Gemini",
        "Claude",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://git.new/wonderland",
        },
        {
          icon: <Icons.chrome className="size-4" />,
          type: "Extension",
          href: "https://dub.sh/wonderland",
        },
      ],
    },
    {
      title: "canvas-mcp",
      href: "https://git.new/canvas-mcp",
      image: "/canvas_mcp_banner.png",
      dates: "2024",
      active: true,
      description:
        "Built an AI-agent protocol that allows you to query your courses in the AI app of your choice. This MCP Server is a collection of Canvas LMS tools for the [model context protocol](https://modelcontextprotocol.io/introduction).",
      technologies: [
        "Python",
        "JavaScript",
        "httpx",
        "Rest API",
        "FastMCP",
        "UV",
        "Anthropic",
        "EdTech",
        "Agentic AI",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://git.new/canvas-mcp",
        },
      ],
    },
    {
      title: "XML Builder",
      image: "/xml_banner.png",
      href: "https://dub.sh/xml-builder",
      dates: "2025",
      active: true,
      description:
        "[Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags), [Google](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/structure-prompts), [OpenAI](https://platform.openai.com/docs/guides/prompt-engineering) recommend using XML to structure your LLM prompts, so this tool helps you quickly generate structured XML prompts without the hassle of manual formatting.",
      technologies: [
        "React.js",
        "Hono.js",
        "TypeScript",
        "SQL",
        "Cloudflare R1",
        "Google OAuth",
        "Express.js",
        "Vercel",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://git.new/xml-builder",
        },
        {
          icon: <Icons.globe className="size-4" />,
          type: "Website",
          href: "https://dub.sh/xml-builder",
        },
      ],
    },
    {
      title: "irina (AI for Minesweeper)",
      href: "https://git.new/irina",
      image: "/irina_banner.png",
      dates: "2024",
      active: true,
      description:
        "AI that solves Minesweeper in record-breaking time. Uses a probabilistic approach, scans the grid, trains a Reinforcement Learning model to make decisions.",
      technologies: [
        "Reinforcement Learning",
        "Python",
        "TensorFlow",
        "Pytorch",
        "Jupyter Notebook",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://git.new/irina",
        },
      ],
    },
    {
      title: "EasyWire",
      image: "/easywire_banner.jpeg",
      href: "https://dub.sh/easywire",
      dates: "2024",
      active: true,
      description:
        "Machine learning model to analyze forex market trends and detect currency arbitrage. Achieved **5%** reduction in losses using sentiment analysis and quantitative analysis.",
      technologies: [
        "Python",
        "Machine Learning",
        "FastAPI",
        "HTML",
        "CSS",
        "Plaid",
        "Docker",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://git.new/easywire",
        },
        {
          icon: <Icons.globe className="size-4" />,
          type: "Website",
          href: "https://dub.sh/easywire",
        },
      ],
    },
    {
      title: "PicThis",
      image: "/picthis_banner.png",
      href: "https://npmjs.com/package/picthis",
      dates: "2025",
      active: true,
      description:
        "CLI tool to convert images to WebP format, reducing file sizes by at least 90% and automatically updating code references. `npx picthis`",
      technologies: [
        "JavaScript",
        "TypeScript",
        "Node.js",
        "npm",
        "CLI",
        "Image Compression",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://git.new/picthis",
        },        
        {
          icon: <Icons.globe className="size-4" />,
          type: "NPM",
          href: "https://npmjs.com/package/picthis",
        },
      ],
    },
    {
      title: "SEOthing",
      href: "https://npmjs.com/package/seothing",
      dates: "2025",
      active: true,
      description:
        "CLI tool to skyrocket your Lighthouse score by converting images to WebP format, generating meta tags, and optimizing for better performance. `npx seothing`",
      technologies: [
        "JavaScript",
        "Gemini API",
        "Node.js",
        "npm",
        "CLI",
        "Image Compression",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://git.new/seothing",
        },
      ],
    },
    {
      title: "MelodySyncer",
      href: "https://dub.sh/melodysyncer",
      dates: "2024",
      active: true,
      description:
        "Created a **sub-100ms** API to convert Spotify playlists to YouTube in Rust 🦀. Used multi-threading and developed a unique scoring algorithm which maximizes accuracy.",
      technologies: [
        "Rust",
        "Tokio",
        "Python",
        "FastAPI",
        "HTML",
        "CSS",
        "Google Cloud",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://git.new/melodysyncer",
        },
        {
          icon: <Icons.globe className="size-4" />,
          type: "Website",
          href: "https://dub.sh/melodysyncer",
        },
      ],
    },    
    {
      title: "DeepDial",
      href: "https://dub.sh/deepdial",
      dates: "2025",
      active: true,
      description:
        "It's like deep research, but for phone calls. Deep Dial uses AI to call businesses and gather information for you, such as comparing prices or checking availability.",
      technologies: [
        "React.js",
        "Node.js",
        "TypeScript",
        "Twilio",
        "Express.js",
        "Deepgram",
        "Google Cloud",
      ],
      links: [
        {
          icon: <Icons.globe className="size-4" />,
          type: "Website",
          href: "https://dub.sh/deepdial",
        },
      ],
    },   
    {
      title: "AMRAS",
      href: "https://git.new/ecmo-bridge",
      dates: "2024",
      active: true,
      description:
        "Web-app designed to efficiently allocate ECMO machines to patients in critical need using a dynamic matching algorithm. Built for Mayo Clinic Phoenix, in a 6-member team.",
      technologies: [
        "ReactJS",
        "NodeJS",
        "TypeScript",
        "Python",
        "Google Cloud",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://git.new/ecmo-bridge",
        },
        {
          icon: <Icons.globe className="size-4" />,
          type: "Website",
          href: "https://dub.sh/amras",
        },
      ],
    },
    {
      title: "EdComposer",
      href: "https://git.new/edcomposer",
      dates: "2024",
      active: true,
      description:
        "EdComposer makes educational videos with just one pdf and one prompt. Built in a 4-member team in October 2023, using cloud-rendering to generate slideshow-style videos.",
      technologies: [
        "TypeScript",
        "Python",
        "FastAPI",
        "HTML",
        "CSS",
        "Google Cloud",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://git.new/edcomposer",
        },
      ],
    },    
    {
      title: "FreshUntil",
      href: "https://git.new/fresh",
      dates: "2024",
      active: true,
      description:
        "Full stack web-app that reduces food wastage by automating expiry notifications, generating custom recipes, and creating a peer-to-peer network to share surplus food.",
      technologies: [
        "ReactJS",
        "NodeJS",
        "TypeScript",
        "Python",
        "Google Cloud",
      ],
      // image: "/freshuntil.png",
      video: null,
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://git.new/fresh",
        },
      ],
    },
    {
      title: "Portfolio",
      href: "https://aryankeluskar.com",
      dates: "2024",
      active: true,
      description:
        "Personal website built with Next.js, Tailwind CSS, and TypeScript. Hosted on Vercel. I mean, you are looking at it right now. Shoutout to magicui for this amazing design!\n\nPS: Notice how the cursor has it's own mini-spotlight wherever it goes.",
      technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://github.com/aryankeluskar/aryankeluskar.com",
        },
        {
          icon: <Icons.globe className="size-4" />,
          type: "Website",
          href: "https://aryankeluskar.com",
        },
      ],
    },
  ] as ProjectType[],
} as const;
