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
  links?: readonly {
    icon: React.ReactNode;
    type: string;
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
  description: "I love CS, Stats & Bagels. 19, building fast backends, scalable language models, and iOS apps. Experienced in full-stack development, machine learning, data analysis, and C++. \n\nBuilding [easywire](https://dub.sh/easywire).",
  summary: "I'm an 18 year old college junior studying computer science and statistics with a passion for solving problems, learning intricate concepts, and building products. I was first exposed to coding when I was 10. Solving problems by converting my thoughts to tangible results in languages that feel incredibly cryptic has been one of the most amazing feelings ever! \n\nI grew up with a deep passion for mathematics, and continue to use bayesian statistics to read the world around me. I have won awards at prestigious hackathons such as HackMIT 2024 and SFHacks 2024. When I'm not coding, I'm probably cycling until I run out of roads",
  // avatarUrl: "/professional.jpg",
  avatarUrl: "/pfp.jpg",
  hackathons: [
    {
      title: "HackIllinois 2025",
      project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/hackillinois.png",
      dates: "February 2025",
      location: "Urbana-Champaign, IL",
      description: "DM if you are participating and want to team up!",
    },
    {
      title: "CalHacks 2024",
      project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/calhacks.png",
      dates: "October 2024",
      location: "Berkeley, CA",
      description: "Won the Best Use of Google Cloud Award",
      links: [{
        // icon: <Icons.devpost className="size-4" />,
        title: "Cura Rx",
        href: "https://devpost.com/software/cura-rx"
      }]
    },
    {
      title: "HackMIT 2024 (Sponsor Prize 🏆)",
      project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/hackmit.png",
      description: "Awarded 1000$ in `Best Use of AI without an API`",
      dates: "September 2024",
      location: "Cambridge, MA",
      links: [{
        // icon: <Icons.devpost className="size-4" />,
        title: "InsightHire",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7245228154615652352/"
      }]
    },
    {
      title: "SFHacks 2024 (Sponsor Track 🏆)",
      project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/sfhacks.png",
      description: "Won the Best Use of Google Cloud Award",
      dates: "April 2024",
      location: "San Francisco, CA",
      links: [{
        // icon: <Icons.devpost className="size-4" />,
        title: "Soul of SF",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7186128731558588417/"
      }]
    },
    {
      title: "LAHacks 2024",
      project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/lahacks.png",
      description: "Won the Best Use of Google Cloud Award",
      dates: "April 2024",
      location: "Los Angeles, CA",
      links: [{
        // icon: <Icons.devpost className="size-4" />,
        title: "FreshUntil",
        href: "https://git.new/fresh"
      }]
    },
    {
      title: "WiCS Coding Contest 2024 + HKD Code-a-thon 2024",
      image: "/wics.png",
      description: "Won 1st Place Undergraduate Team (out of 150+ participants) at WiCS and 1st Place Overall at HKD Code-a-thon. Both of these were Leetcode-style coding competitions with questions in Data Structures and Algorithms.",
      dates: "March 2024",
      location: "Tempe, AZ"
    },
    {
      title: "SunHacks 2023",
      project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/sunhacks.png",
      description: "Won the Best Use of Google Cloud Award",
      dates: "November 2023",
      location: "Tempe, AZ"
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
      title: "Opportunity Hack 2023 (Finalist)",
      project: "https://devpost.com/software/ai-in-education-by-scaleup",
      image: "/opportunityhack.png",
      description: "Top 5 Finalist out of 100+ participants",
      dates: "October 2023",
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
    // { href: "/blog", icon: NotebookIcon, label: "Blog" }
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
        name: "Twitter",
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
        navbar: false
      }
    }
  },
  work: [
    {
      company: "Data Mining and Machine Learning Lab",
      href: "https://dmml.asu.edu/",
      badges: [],
      location: "Arizona State University",
      title: "Undergraduate Researcher",
      logoUrl: "/cropped-asu-icon.png",
      start: "April 2024",
      end: "Present",
      description: <>Fine-tuned OpenAI&apos;s <span style={{fontWeight: 'bold', color: '#74AA9C'}}>GPT-4o</span> and 4o-mini models using <span style={{fontWeight: 'bold', color: '#306998'}}>Python</span> to improve comprehension of ambiguous human text, and co-authored an <span style={{fontWeight: 'bold', color: '#00629B'}}>IEEE</span> BigData paper with Professor Huan Liu and PhD Students.</>
    },
    {
      company: "The Biodesign Institute – Qiyun Lab",
      href: "https://scikit.bio",
      badges: [],
      location: "Arizona State University",
      title: "Software Engineering Intern", 
      logoUrl: "/skbio.webp",
      start: "May 2024",
      end: "August 2024",
      description: <>Created benchmarking and training scripts for Language Models using <span style={{fontWeight: 'bold', color: '#eb8f00'}}>HuggingFace</span> and <span style={{fontWeight: 'bold', color: '#306998'}}>Python</span> with PyTorch & Transformers libraries. Increased code coverage by 12.5% and resolved codebase warnings by 91.4%. Developed statistical models to improve gut microbe analysis significance by 10%.</>
    },
    {
      company: "RCV Innovations Pvt. Ltd.",
      href: "https://rcvinnovations.com/",
      badges: [],
      location: "Remote",
      title: "Website Development Intern",
      logoUrl: "/rcv.jpeg",
      start: "June 2023", 
      end: "July 2023",
        description: <>Developed backend infrastructure for static assets and 3D models integration using <span style={{fontWeight: 'bold', color: '#306998'}}>JavaScript</span> and <span style={{fontWeight: 'bold', color: '#00629B'}}>React.js</span>, yielding 46% surge in customer satisfaction. Created <span style={{fontWeight: 'bold', color: '#eb8f00'}}>Power BI</span> dashboards and automated data collection using Google Analytics API, increasing click-through-rate by 29%.</>
    }
  ],
  education: [
    {
      school: "Arizona State University (Barrett Honors)",
      href: "https://asu.edu",
      degree: <><strong>BS in Computer Science</strong>, Minor in Statistics</>,
      logoUrl: "/maroon.webp",
      start: "August 2023",
      end: "May 2026",
      description: "GPA: 3.94\nCoursework: Data Structures & Algorithms, Programming with C/C++, Computer Organization, Assembly, Object-Oriented Programming, Digital Design, Software Engineering, Operating Systems, Information Assurance."
    },
    {
      school: "Buildspace",
      href: "https://buildspace.so",
      degree: "nights & weekends s5",
      logoUrl: "/buildspace.jpg",
      start: "May 2024",
      end: "June 2024",
      description: "Completed the Full Stack Developer course."
    }
  ],
  projects: [
    {
      title: "EasyWire",
      href: "https://dub.sh/easywire",
      dates: "2024",
      active: true,
      description: "Developed and deployed a machine learning model to analyze foreign exchange market trends and detect currency arbitrage. Achieved 4% reduction in losses using sentiment analysis and quantitative analysis.",
      technologies: ["Python", "Machine Learning", "FastAPI", "HTML", "CSS", "Plaid", "Docker"],
      links: [{
        icon: <Icons.github className="size-4" />,
        type: "GitHub",
        href: "https://git.new/easywire"
      },
      {
        icon: <Icons.globe className="size-4" />,
        type: "Website",
        href: "https://dub.sh/easywire"
      }
    ]
    },
    {
      title: "FreshUntil",
      href: "https://git.new/fresh",
      dates: "2024",
      active: true,
      description: "Developed a full stack web-app that reduces food wastage by delivering automated expiry notifications, generating personalized recipes, and creating a peer-to-peer network for surplus food.",
      technologies: ["ReactJS", "NodeJS", "TypeScript", "Python", "Google Cloud"],
      // image: "/freshuntil.png",
      video: null,
      links: [{ 
        icon: <Icons.github className="size-4" />,
        type: "GitHub",
        href: "https://git.new/fresh"
      }]
    },
    {
      title: "MelodySyncer",
      href: "https://dub.sh/melodysyncer",
      dates: "2024",
      active: true,
      description: "Created an API to convert Spotify songs or playlists to YouTube within 0.2 seconds. Improved performance by 12x with multi-threading and developed a unique scoring algorithm which maximizes speed and accuracy.",
      technologies: ["TypeScript", "Python", "FastAPI", "HTML", "CSS", "Google Cloud"],
      links: [{
        icon: <Icons.github className="size-4" />,
        type: "GitHub",
        href: "https://git.new/melodysyncer"
      },
      {
        icon: <Icons.globe className="size-4" />,
        type: "Website",
        href: "https://dub.sh/melodysyncer"
      }
    ]
    }
  ] as ProjectType[]
} as const;
