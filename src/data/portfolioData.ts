export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "Fintech & Web Systems" | "Full-Stack & Geolocation" | "Campus & Enterprise Systems" | "Systems & Utilities";
  featured: boolean;
  status: "Live on Vercel" | "Hackathon Solution" | "University Platform" | "Active";
  metrics: { label: string; value: string }[];
  overview: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  badge?: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  type: "Work Experience & Attachment" | "Academic & Research";
  highlights: string[];
  technologies: string[];
  metrics: string[];
}

export interface EducationEntry {
  period: string;
  qualification: string;
  institution: string;
  details: string;
  highlights?: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface Reference {
  name: string;
  role: string;
  department: string;
  institution: string;
  phone: string;
  email: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Eugene Maposa",
    title: "Computer Science Graduate & Software Developer",
    subheading: "B.Sc. (Hons) in Computer Science (Upper Second Division 2.1) from NUST with two years of practical experience at the Technovation Centre.",
    summary: "Computer Science graduate with an Upper Second Division (2.1) honours degree from the National University of Science and Technology and two years of practical experience at the university’s Technovation Centre. Experienced in software development and laboratory technical support, with academic and certified training in web development, databases, algorithms, artificial intelligence and information security. Deployed a live web project and is developing additional software. Analytical, adaptable and committed to building reliable, user-focused systems.",
    dob: "25 June 2000 (26 years)",
    nationality: "Zimbabwean",
    address: "9148 Nkulumane 12, Bulawayo, Zimbabwe",
    location: "9148 Nkulumane 12, Bulawayo, Zimbabwe",
    status: "Available for Software Engineering & Developer Roles",
    languages: ["English", "Shona", "Ndebele"],
    interests: "Software development, web systems, data management, artificial intelligence and information security",
    education: {
      degree: "B.Sc. Honours Degree in Computer Science",
      institution: "National University of Science and Technology (NUST)",
      grade: "Upper Second Division (2.1)",
      credits: "496 Academic Credits",
      period: "2022 — 2026",
      awardDate: "17 September 2026 (Graduation ceremony 17 November 2026)",
      studentNo: "N02216673W",
      certificateNo: "H0087726",
      focus: "Software Engineering, Web Development, Database Systems, Design and Analysis of Algorithms, Artificial Intelligence"
    },
    metrics: [
      { label: "Degree Division", value: "2.1 Honours" },
      { label: "NUST Credits", value: "496 Earned" },
      { label: "Technovation Exp.", value: "2 Years" },
      { label: "A-Level CompSci", value: "Grade A" }
    ],
    socials: {
      github: "https://github.com/Eugene-maposa",
      githubSecondary: "https://github.com/maposaeugene16",
      githubAccounts: ["Eugene-maposa", "maposaeugene16"],
      linkedin: "https://linkedin.com/in/eugene-maposa",
      email: "maposa.eugene16@gmail.com",
      secondaryEmail: "mapseujers@gmail.com",
      phones: ["+263 775 126 513", "+263 713 641 507"],
      address: "9148 Nkulumane 12, Bulawayo, Zimbabwe",
      pgpKeyId: "0x7E9A3F1C8B4D2E05",
      cvPdfUrl: "/Eugene-Maposa-Application-Pack.pdf",
      whatsappUrl: "https://wa.me/263775126513?text=Hello%20Eugene%2C%20I%20reviewed%20your%20portfolio%20and%20CV%20and%20would%20like%20to%20connect.",
      smsUrl: "sms:+263775126513"
    }
  },

  technicalCompetencies: [
    {
      name: "Software Development",
      description: "Core programming languages, paradigms, and algorithmic foundations.",
      skills: [
        { name: "JavaScript (ES6+)", context: "Primary language for frontend and backend web applications" },
        { name: "Node.js & Express", context: "Certified training; backend RESTful API architecture and middleware" },
        { name: "Software Engineering", context: "SDLC lifecycle, object-oriented design, testing, and clean code" },
        { name: "Data Structures & Algorithms", context: "Design and analysis of algorithms, graph theory, time/space bounds" }
      ]
    },
    {
      name: "Web & Data",
      description: "Full-stack web architecture, database design, and systems analysis.",
      skills: [
        { name: "Backend Web Development", context: "Client-server architecture, API routing, asynchronous event handling" },
        { name: "Database Systems", context: "Relational modeling, SQL queries, normalization, integrity constraints" },
        { name: "Enterprise Data Management", context: "Storage management, data integrity, transactional workflows" },
        { name: "Systems Analysis & Design", context: "Requirements engineering, architectural diagrams, user-focused systems" }
      ]
    },
    {
      name: "Computing Foundations",
      description: "Theoretical, architectural, and security principles from NUST academic study.",
      skills: [
        { name: "Artificial Intelligence", context: "Machine learning fundamentals, search algorithms, heuristics" },
        { name: "Cybersecurity & Auditing", context: "Information security principles, authentication, secure coding practices" },
        { name: "Computer Networks", context: "OSI and TCP/IP models, routing protocols, socket programming" },
        { name: "Operating Systems", context: "Process scheduling, concurrency, memory management, Linux systems" }
      ]
    }
  ],

  experience: [
    {
      company: "Technovation Centre, National University of Science and Technology (NUST)",
      role: "Software Developer & Lab Technician",
      location: "Bulawayo, Zimbabwe",
      period: "2024 — 2026",
      type: "Work Experience & Attachment",
      highlights: [
        "Completed two full years of practical work experience, including the official university industrial attachment year.",
        "Contributed actively to software development initiatives for university and community systems.",
        "Provided dedicated laboratory technical support, hardware/software troubleshooting, and network maintenance for academic workstations.",
        "Assisted students and faculty with technical setups, software deployment, and system diagnostics."
      ],
      technologies: ["JavaScript", "Node.js", "Express", "Database Systems", "Hardware/Software Lab Support", "Linux/Windows"],
      metrics: ["2 Years Full Duration", "Attachment Year Completed", "Technovation Centre NUST"]
    }
  ] as Experience[],

  projects: [
    {
      id: "industry-hub",
      slug: "course-shop-industry-hub",
      title: "Course Shop & Industry Hub",
      tagline: "NUST Final Year Project connecting coursework, practical student technical competencies, and industry placement.",
      category: "Campus & Enterprise Systems",
      featured: true,
      status: "Live on Vercel",
      badge: "NUST Final Year Project",
      liveUrl: "https://course-shop-industry-hub-5tdz.vercel.app",
      metrics: [
        { label: "Project Scope", value: "Final Year Project" },
        { label: "Deployment", value: "Vercel Live" },
        { label: "UI System", value: "Radix UI + Tailwind" }
      ],
      overview: "Eugene's official NUST Computer Science Final Year Project. Designed to bridge university academic coursework with practical industry demands, allowing students to showcase verified skills and discover industry placement opportunities.",
      highlights: [
        "Deployed live on Vercel domain with high-availability cloud hosting",
        "Curated technical skill taxonomies aligned with NUST academic modules",
        "Interactive course directory and partner project matching board",
        "Type-safe form schemas with Zod and responsive Radix UI component primitives"
      ],
      techStack: ["TypeScript", "React", "Vite", "Tailwind CSS", "Radix UI", "Zod", "Vercel"],
      githubUrl: "https://github.com/Eugene-maposa/course-shop-industry-hub"
    },
    {
      id: "citycasuallink",
      slug: "citycasuallink-maps-joblink",
      title: "CityCasualLink & Maps JobLink",
      tagline: "Real-time casual employment routing and video interview web platform deployed on Vercel.",
      category: "Full-Stack & Geolocation",
      featured: true,
      status: "Live on Vercel",
      badge: "Hackathon Project",
      liveUrl: "https://citycasuallink-au82.vercel.app",
      metrics: [
        { label: "Deployment", value: "Vercel Live" },
        { label: "Video Engine", value: "LiveKit WebRTC" },
        { label: "Mapping", value: "Leaflet Routing" }
      ],
      overview: "Developed for a competitive Hackathon to solve casual job placement and routing logistics. Features turn-by-turn routing via Leaflet Routing Machine, low-latency video calling using LiveKit WebRTC, and Supabase cloud persistence.",
      highlights: [
        "Live deployment on Vercel accessible to employers and job seekers",
        "Low-latency real-time video/audio interviews between employers and job candidates",
        "Interactive geospatial routing with Leaflet and Leaflet Routing Machine",
        "Supabase cloud backend integration with TanStack React Query caching"
      ],
      techStack: ["TypeScript", "React", "LiveKit", "Leaflet Maps", "Supabase", "Tailwind CSS", "Vercel"],
      githubUrl: "https://github.com/maposaeugene16/citycasuallink"
    },
    {
      id: "zimscore",
      slug: "zimscore-web-platform",
      title: "ZIMSCORE Web Platform",
      tagline: "Credit scoring and financial assessment web application deployed on Vercel.",
      category: "Fintech & Web Systems",
      featured: true,
      status: "Live on Vercel",
      badge: "Selected Project on CV",
      metrics: [
        { label: "Deployment", value: "Vercel Domain" },
        { label: "Frontend", value: "React + Vite" },
        { label: "Testing", value: "Vitest Tested" }
      ],
      overview: "Eugene's primary selected project featured in the official curriculum vitae. Deployed live to a Vercel domain, taking a credit scoring and risk evaluation solution directly from development into a high-availability online production environment.",
      highlights: [
        "Deployed to live online Vercel domain for public accessibility",
        "Modular architecture separating score calculation rules from visual presentation",
        "Type-safe data flow using TypeScript and reactive state handling",
        "Responsive, intuitive financial dashboards and risk metrics"
      ],
      techStack: ["TypeScript", "React", "Vite", "Tailwind CSS", "Vitest", "Vercel"],
      githubUrl: "https://github.com/Eugene-maposa/zimscore-fintech"
    },
    {
      id: "nust-tech-hub",
      slug: "nust-tech-hub-portal",
      title: "NUST Tech Hub & Innovation Portal",
      tagline: "University innovation management web app with in-browser QR code verification and PDF certificate exports.",
      category: "Campus & Enterprise Systems",
      featured: true,
      status: "University Platform",
      badge: "University Platform",
      metrics: [
        { label: "QR Scanner", value: "react-zxing" },
        { label: "PDF Export", value: "jsPDF Engine" },
        { label: "Authentication", value: "Supabase Auth" }
      ],
      overview: "Campus technology directory and innovation management portal engineered for NUST. Features camera-based QR code verification for physical events, client-side PDF credential generation, and project showcases.",
      highlights: [
        "In-browser camera QR code scanning for physical attendee validation",
        "Instant client-side PDF certificate creation with jsPDF",
        "Supabase cloud backend for authentication and database management",
        "Radix UI primitives for accessible component interaction"
      ],
      techStack: ["TypeScript", "React", "Supabase", "jsPDF", "QR Scanner (ZXing)", "Tailwind CSS"],
      githubUrl: "https://github.com/maposaeugene16/nust-tech-hub"
    },
    {
      id: "sentinel-node",
      slug: "sentinel-node-monitor",
      title: "Sentinel Node: Systems Health Monitor",
      tagline: "Lightweight background utility providing HTTP endpoint uptime inspection and response telemetry.",
      category: "Systems & Utilities",
      featured: false,
      status: "Active",
      badge: "Backend Utility",
      metrics: [
        { label: "Runtime", value: "Node.js" },
        { label: "Protocol", value: "HTTP Telemetry" },
        { label: "Footprint", value: "Minimal" }
      ],
      overview: "A lightweight backend monitoring utility providing automated uptime inspection, latency monitoring, and status alerts for web services.",
      highlights: [
        "Asynchronous HTTP polling for service availability",
        "Structured logging of request response times and error statuses",
        "Clean, minimal dependencies for rapid deployment"
      ],
      techStack: ["TypeScript", "Node.js", "Express", "REST APIs"],
      githubUrl: "https://github.com/maposaeugene16/sentinel-node"
    }
  ] as Project[],

  educationHistory: [
    {
      period: "2022 — 2026",
      qualification: "Bachelor of Science Honours Degree in Computer Science",
      institution: "National University of Science and Technology (NUST), Bulawayo",
      details: "Upper Second Division (2.1) • 496 Academic Credits • Award Date: 17 September 2026",
      highlights: [
        "Degree Certificate: H0087726 (Serial No. 032556) • Student No: N02216673W",
        "Part I: Calculus, Digital Electronics, Programming Principles, Computer Architecture, Data Structures & Algorithms, Database Systems",
        "Part II: Software Analysis & Design, Web Development, Advanced Mathematical Structures, Mobile App Development, Algorithms",
        "Part III: Industrial Attachment (Technovation Centre NUST)",
        "Part IV: Artificial Intelligence, Enterprise Architecture Programming, Digital Forensics, Enterprise Data Management, Final Year Project"
      ]
    },
    {
      period: "2020 — 2021",
      qualification: "ZIMSEC Advanced Level (GCE)",
      institution: "Mbuyanehanda High School & Chemimwe Secondary School",
      details: "Computer Science: Grade A • Pure Mathematics: Grade B • Business Studies: Grade D",
      highlights: [
        "Strong quantitative and algorithmic foundation from Pure Mathematics and Computer Science"
      ]
    },
    {
      period: "2018",
      qualification: "ZIMSEC Ordinary Level (GCE)",
      institution: "Chegato High School",
      details: "9 subjects with 8 passes at grade C or better (History A, Combined Science B, Mathematics B, Shona B, Geography B, FRS B, English C, Business C)",
      highlights: []
    }
  ] as EducationEntry[],

  certifications: [
    {
      title: "Backend Web Development using JavaScript, Node.js & Express",
      issuer: "Google Developer Student Clubs & Microsoft Learn Student Ambassadors (DevTown KIIT Chapter)",
      date: "April 2023",
      description: "7-day intensive bootcamp covering backend web architecture, asynchronous JavaScript, Node.js runtime, Express routing, middleware, and REST API design."
    },
    {
      title: "National Foundation Certificate — Computer Operations and Packages",
      issuer: "Ministry of Higher and Tertiary Education, Science and Technology Development",
      date: "31 December 2018",
      description: "Government-certified foundational training in computer systems operations, system packages, and office productivity technologies."
    }
  ] as Certification[],

  academicStudy: {
    development: [
      "Software Engineering",
      "Web Development",
      "Mobile Application Development",
      "Enterprise Architecture Programming",
      "Final Year Project"
    ],
    systems: [
      "Design and Analysis of Algorithms",
      "Database Systems",
      "Computer Networks",
      "Artificial Intelligence",
      "Digital Forensics",
      "Enterprise Data Management"
    ]
  },

  references: [
    {
      name: "Mrs S. Hleza",
      role: "Secretary",
      department: "Innovation and Business Development (IBD)",
      institution: "National University of Science and Technology (NUST)",
      phone: "+263 77 277 0105",
      email: "siphumuzile.hleza@nust.ac.zw"
    },
    {
      name: "Mr C. Khumalo",
      role: "IBD Innovation Lead",
      department: "Innovation and Business Development (IBD)",
      institution: "National University of Science and Technology (NUST)",
      phone: "+263 77 271 8209",
      email: "clive.khumalo@nust.ac.zw"
    },
    {
      name: "Mr K. R. Chilumani",
      role: "Supervisor",
      department: "Software Development Centre",
      institution: "National University of Science and Technology (NUST)",
      phone: "+263 77 349 2419",
      email: "khesani.chilumani@nust.ac.zw"
    }
  ] as Reference[],

  terminalCommands: [
    { command: "help", description: "Display list of all executable commands" },
    { command: "cv", description: "Print official CV overview, degree classification, and summary" },
    { command: "skills", description: "Query Software Development, Web & Data, and Computing Foundations" },
    { command: "projects", description: "List ZIMSCORE (Vercel) and verified GitHub repositories" },
    { command: "experience", description: "Display Technovation Centre (NUST) 2-year practical track record" },
    { command: "education", description: "Display NUST 2.1 Honours degree and ZIMSEC A-Level results" },
    { command: "certs", description: "Display Google/Microsoft and Ministry certifications" },
    { command: "references", description: "Display NUST academic and professional referee contacts" },
    { command: "contact", description: "Display phone numbers, emails, and 9148 Nkulumane 12 address" },
    { command: "algo", description: "Run interactive algorithm benchmark simulation" },
    { command: "neofetch", description: "Render candidate profile and system specifications" },
    { command: "sudo hire", description: "Execute privileged hiring celebration" },
    { command: "clear", description: "Flush terminal scrollback buffer" }
  ]
};
