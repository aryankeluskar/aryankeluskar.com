import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

type ProjectType = {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: string[];
  image?: string;
  video?: string;
  links?: Array<{ href: string; label: string }>;
};

type HackathonType = {
  title: string;
  project?: string;
  image?: string;
  dates?: string;
  location?: string;
  description?: string;
  links?: Array<{ href: string; label: string }>;
};

export const DATA = {
  name: "Aryan Keluskar",
  initials: "AK",
  url: "https://aryankeluskar.com",
  resumeUrl: "https://dub.sh/aryans-resume",
  location: "Tempe, AZ",
  locationLink: "https://www.google.com/maps/place/tempe",
  description: "I love CS, Stats & Bagels. 18, building fast backends and iOS apps. Experienced in full-stack development, machine learning, data analysis, and C++. Building [alice](https://dub.sh/wonderland) and [easywire](https://dub.sh/easywire).",
  summary: "I'm an 18 year old college junior studying computer science and statistics with a passion for solving problems, learning intricate concepts, and building products. I was first exposed to coding when I was 10. Solving problems by converting my thoughts to tangible results in languages that feel incredibly cryptic has been one of the most amazing feelings ever!",
  summary2: "I grew up with a deep passion for mathematics, and continue to use bayesian statistics to read the world around me. I have won awards at prestigious hackathons such as HackMIT 2024 and SFHacks 2024. When I'm not coding, I'm probably cycling until I run out of roads",
  avatarUrl: "/me.png",
  hackathons: [
    {
      title: "CalHacks 2024",
      project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/calhacks.png",
      dates: "October 2024",
      location: "Berkeley, CA",
      description: "Won the Best Use of Google Cloud Award"
    },
    {
      title: "HackMIT 2024 (Sponsor Prize 🏆)",
      project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/hackmit.png",
      description: "Awarded 1000$ for `Best Use of AI without an API`",
      dates: "September 2024",
      location: "Cambridge, MA"
    },
    {
      title: "SFHacks 2024 (Sponsor Track 🏆)",
      project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/sfhacks.png",
      description: "Won the Best Use of Google Cloud Award",
      dates: "April 2024",
      location: "San Francisco, CA"
    },
    {
      title: "AI in Education by ScaleU (Honorable Mention 🏆)",
      project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/scaleup.png",
      description: "Won the Best Use of Google Cloud Award",
      dates: "October 2023",
      location: "Scottsdale, AZ"
    },
    {
      title: "WiCS Coding Contest 2024",
      image: "/wics.png",
      description: "1st Place Undergraduate Team (out of 150+ participants)",
      dates: "March 2024",
    },
    {
      title: "LAHacks 2024",
      project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/lahacks.png",
      description: "Won the Best Use of Google Cloud Award",
      dates: "April 2024",
      location: "Los Angeles, CA"
    },
    {
      title: "SunHacks 2023",
      project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/sunhacks.png",
      description: "Won the Best Use of Google Cloud Award",
      dates: "November 2023",
      location: "Tempe, AZ"
    }
  ] as HackathonType[],
  skills: [
    "Java",
    "C++", 
    "Python",
    "JavaScript",
    "SQL",
    "C",
    "Julia",
    "Golang", 
    "Scheme",
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
    "Git"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" }
  ],
  contact: {
    email: "contact@aryankeluskar.com",
    tel: "+16025526402",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://dub.sh/aryans-github",
        icon: Icons.github,
        navbar: true
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://dub.sh/aryans-linkedin",
        icon: Icons.linkedin,
        navbar: true
      },
      X: {
        name: "X",
        url: "https://dub.sh/aryans-twitter",
        icon: Icons.x,
        navbar: true
      },
      Strava: {
        name: "Strava",
        url: "https://dub.sh/aryans-strava",
        icon: Icons.strava,
        navbar: true
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false
      }
    }
  },
  work: [
    {
      company: "Data Mining and Machine Learning Lab",
      href: "#",
      badges: [],
      location: "Arizona State University",
      title: "Undergraduate Researcher",
      logoUrl: "/asu.png",
      start: "April 2024",
      end: "Present",
      description: <>Fine-tuned <span style={{fontWeight: 'bold', color: '#74AA9C'}}>OpenAI</span>&apos;s GPT-4o and 4o-mini models using <span style={{fontWeight: 'bold', color: '#306998'}}>Python</span> to improve comprehension of ambiguous human text, and co-authored an <span style={{fontWeight: 'bold', color: '#00629B'}}>IEEE</span> BigData paper with Professor Huan Liu and PhD Students.</>
    },
    {
      company: "The Biodesign Institute – Qiyun Lab",
      href: "#",
      badges: [],
      location: "Arizona State University",
      title: "Software Engineering Intern", 
      logoUrl: "/biodesign.png",
      start: "May 2024",
      end: "August 2024",
      description: <>Created benchmarking and training scripts for Language Models using <span style={{fontWeight: 'bold', color: '#eb8f00'}}>HuggingFace</span> and <span style={{fontWeight: 'bold', color: '#306998'}}>Python</span> with PyTorch & Transformers libraries. Increased code coverage by 12.5% and resolved codebase warnings by 91.4%. Developed statistical models to improve gut microbe analysis significance by 10%.</>
    },
    {
      company: "RCV Innovations Pvt. Ltd.",
      href: "#",
      badges: [],
      location: "Remote",
      title: "Website Development Intern",
      logoUrl: "/rcv.png",
      start: "June 2023", 
      end: "July 2023",
        description: <>Developed backend infrastructure for static assets and 3D models integration using <span style={{fontWeight: 'bold', color: '#306998'}}>JavaScript</span> and <span style={{fontWeight: 'bold', color: '#00629B'}}>React.js</span>, yielding 46% surge in customer satisfaction. Created Power BI dashboards and automated data collection using Google Analytics API, increasing click-through-rate by 29%.</>
    }
  ],
  education: [
    {
      school: "Arizona State University (Barrett Honors)",
      href: "https://asu.edu",
      degree: "BS in Computer Science, Minor in Statistics",
      logoUrl: "/asu.png",
      start: "August 2023",
      end: "May 2026",
      description: "GPA: 3.94\nCoursework: Data Structures & Algorithms, Programming with C/C++, Computer Organization, Assembly, Object-Oriented Programming, Digital Design, Software Engineering, Operating Systems, Information Assurance."
    }
  ],
  projects: [
    {
      title: "FreshUntil",
      href: "https://git.new/fresh",
      dates: "2024",
      active: true,
      description: "Developed a full stack web-app that reduces food wastage by delivering automated expiry notifications, generating personalized recipes, and creating a peer-to-peer network for surplus food.",
      technologies: ["ReactJS", "NodeJS", "TypeScript", "Python", "Google Cloud"],
      // image: "/freshuntil.png",
      video: null,
      // links: [{ href: "https://git.new/fresh", label: "GitHub" }]
    },
    {
      title: "EasyWire",
      href: "https://dub.sh/easywire",
      dates: "2024",
      active: true,
      description: "Developed and deployed a machine learning model to analyze foreign exchange market trends and detect currency arbitrage. Achieved 4% reduction in losses using sentiment analysis and quantitative analysis.",
      technologies: ["Python", "Machine Learning", "FastAPI", "HTML", "CSS", "Plaid", "Docker"]
    },
    {
      title: "MelodySyncer",
      href: "https://dub.sh/melodysyncer",
      dates: "2024",
      active: true,
      description: "Created an API to convert Spotify songs or playlists to YouTube within 0.2 seconds. Improved performance by 12x with multi-threading and developed a unique scoring algorithm which maximizes speed and accuracy.",
      technologies: ["TypeScript", "Python", "FastAPI", "HTML", "CSS", "Google Cloud"]
    }
  ] as ProjectType[]
} as const;
