// ─────────────────────────────────────────────────────────────
//  EDIT YOUR CV HERE
//  Everything on the page is generated from this file.
//  Change text, add bullets, reorder items — the layout updates
//  automatically. No need to touch the components or CSS.
// ─────────────────────────────────────────────────────────────

export const cv = {
  name: 'Khalil Ur Rehman',
  title: 'Full Stack Web & Mobile Application Developer',

  contacts: [
    { icon: 'mail', label: 'khalilurrehman.it@gmail.com', href: 'mailto:khalilurrehman.it@gmail.com' },
    { icon: 'phone', label: '+92 312 5301590', href: 'tel:+923125301590' },
    { icon: 'linkedin', label: 'linkedin.com/in/khalil-ur-rehman-it', href: 'https://linkedin.com/in/khalil-ur-rehman-it' },
    { icon: 'github', label: 'github.com/khalilurrehman-it', href: 'https://github.com/khalilurrehman-it' },
  ],

  // Short intro paragraph (optional — set to '' to hide). Off by default to match the original CV.
  summary: '',

  skills: [
    {
      group: 'Frontend Development',
      side: 'left',
      items: [
        { label: 'Frameworks & Libraries', value: 'React.js, Next.js, React Native, TanStack Query, TanStack Table' },
        { label: 'UI/UX', value: 'Responsive Design, Component-Based Architecture, Performance Optimization' },
        { label: 'Styling Tools', value: 'Tailwind CSS, Bootstrap, CSS Modules' },
      ],
    },
    {
      group: 'Backend Development & Database',
      side: 'right',
      items: [
        { label: 'Languages & Frameworks', value: 'Node.js, Express.js, Python, FastAPI' },
        { label: 'Databases & ORM', value: 'PostgreSQL, MongoDB, Drizzle ORM, Firebase (Authentication, Firestore, Realtime DB)' },
        { label: 'API Integration', value: 'RESTful APIs, third-party services' },
      ],
    },
    {
      group: 'Tools & Version Control',
      side: 'right',
      items: [{ label: '', value: 'Git, GitHub, Bitbucket, Postman, Playwright' }],
    },
    {
      group: 'Cloud & DevOps',
      side: 'right',
      items: [{ label: '', value: 'Azure Container Apps, Azure Blob Storage, Docker, GitHub Actions (CI/CD)' }],
    },
    {
      group: 'Software Architecture & Practices',
      side: 'left',
      items: [
        { label: 'Principles & Patterns', value: 'DRY, SOLID, Reusability' },
        { label: 'Architecture', value: 'Component-Based Design, RESTful Architecture, Scalable Frontend Patterns' },
      ],
    },
  ],

  experience: [
    {
      role: 'Full Stack Developer',
      company: 'Intelligent Artificials',
      website: 'https://www.iartificials.com/',
      date: 'December 2025 – May 2026',
      location: 'Remote',
      bullets: [
        'Built a production Playwright-based web scraper with multi-region profiles (Germany-wide + Hamburg), automated cron scheduling, LV document download pipeline, and Azure Blob Storage persistence.',
        'Migrated the heatmap analytics module from static Excel and JSON files to a fully database-backed architecture — seeding 6,474 real bid records and 912 company KPIs.',
        'Built a cross-service data pipeline: Python extraction → Node.js HTTP endpoint → PostgreSQL with 5-minute TTL caching for high-frequency dashboard queries.',
        'Built a 4-step LLM prompt-chain pipeline for automated construction tender price prediction using GPT-4o-mini with parallel batch processing and per-step token limits — reducing prediction cost while maintaining accuracy.',
        "Solved Azure Container Apps' hard 240-second request timeout by implementing a background prediction pattern with async polling — enabling long-running AI jobs without infrastructure changes.",
        'Introduced a multi-tenant data model with tenant-scoped folders, categories, and PDF drafts using Drizzle ORM migrations.',
        'Fixed critical PDF rendering bugs including Unicode font support for German special characters, oversized row splitting, and word-level page-break handling.',
        'Set up production monitoring via GitHub Actions with automated alerting and E2E post-deploy user journey tests as part of the CI/CD pipeline.',
        'Built the LV dashboard with filters, sorting, persistence, pagination optimisation, and KO-criteria indicators using TanStack Query and TanStack Table.',
      ],
    },
    {
      role: 'Back-End Developer Intern',
      company: 'Techvexa',
      date: 'May 2025 – June 2025',
      location: 'Remote, Islamabad',

      bullets: [
        'Built and maintained backend APIs using Node.js and Express.js, with a focus on clean, modular code.',
        'Worked with MongoDB for designing database schemas, handling queries, and optimizing performance.',
        'Integrated third-party services and RESTful APIs into backend workflows for real-world SaaS features.',
        'Built reusable utility functions and middleware to manage authentication, routing, and API logic more efficiently.',
        'Collaborated with frontend teams to implement REST APIs, ensuring smooth data flow and bug-free integration.',
        'Participated in code reviews and applied Git workflows to maintain clean, version-controlled repositories.',
      ],
    },
    {
      role: 'Front End Developer',
      company: 'Code Studio Solutions',
      website: 'https://codestudio.solutions/',
      date: 'July 2024 – April 2025',
      location: 'Islamabad, Pakistan',
      bullets: [
        'Improved page load speed by 15% using Next.js dynamic imports, next/image optimization, and re-render reduction through React.memo & useCallback/useMemo.',
        'Solved performance issues by reorganizing state, isolating side-effects, and developing custom reusable hooks for cleaner logic.',
        'Built dynamic form flows integrated with backend APIs and implemented optimistic UI updates with loading and error states for smooth UX.',
        'Developed EVA — an AI-powered voice commerce landing page with chatbot interactions, smooth Framer Motion animations, and reusable UI components.',
        'Integrated Google AdMob in a React Native app to control conditional ad visibility based on user type and navigation behavior.',
        'Designed engaging UI components (feature tabs, accordions, animated sections) using Framer Motion to boost usability and interaction.',
        'Enhanced code quality through modular architecture, reusable components, and Git-based version control with team review processes.',
      ],
    },
  ],

  projects: [
    {
      name: 'House of SnH',
      tagline: 'International E-Commerce Platform',
      description:
        'A production e-commerce platform for authentic Kashmiri and Pakistani handcrafted products targeting customers in the US and Canada. It supports guest and registered customers, dual-currency pricing, a full order management system, and a private admin panel — deployed across two separate cloud platforms.',
      highlights: [
        "International storefront with dual-currency support — prices in USD and CAD simultaneously, with the customer's preferred currency snapshotted at order time so historic totals stay accurate.",
        'Complete product catalogue with infinite scroll, category filtering, keyword search, and sort — built as Server Components for fast initial load and SEO, with client-side filter interactions layered on top.',
        'Guest and authenticated checkout — guests get an Order Reference ID to track orders without an account; registered customers see full order history in their dashboard.',
        'Custom order module — customers submit bespoke product requests with material preferences, dimensions, and specifications for made-to-order products.',
        'Admin product management — Tiptap v3 rich text editor for descriptions, multi-image uploads via Cloudinary with per-file progress, promote-to-primary image ordering, and badge management (Bestseller, New, Organic, Handmade).',
        'Admin order management — full order lifecycle with status updates, customer-visible tracking notes, and internal admin notes separated at the TypeScript type level so they can never appear in customer-facing responses.',
        'Cross-origin authentication across two cloud deployments — session cookies on the Railway backend, marker-cookie system for Next.js middleware route protection on Vercel, with fully separate auth instances for customers and admin.',
      ],
      tech: 'Next.js 16 · TypeScript · Express 5 · Node.js 22 · Drizzle ORM · PostgreSQL · Cloudinary · Better Auth · Redux Toolkit · Framer Motion · Tiptap v3 · Railway · Vercel',
    },
    {
      name: "SnN's Cross Bridge",
      tagline: 'Multi-Tenant Client Portal',
      description:
        'A secure client portal for a US, Canada, and Pakistan tax consultancy firm. Clients submit cases, upload documents, communicate with their assigned advisor, book consultations via Calendly, and pay for services. The platform has three distinct roles — client, advisor, and admin — each with its own access scope.',
      highlights: [
        'Case management with a full lifecycle — clients submit cases under service categories (taxation, business consultancy, higher education, training); advisors manage assigned cases from submitted to closed; managers oversee all cases and can reassign advisors.',
        'Three-role access model enforced independently at the middleware, layout guard, and API route level so no single bypass point exists.',
        'Real-time chat on Supabase Realtime with a security bridge — session stays in an HTTP-only cookie while the browser gets a short-lived token for the WebSocket; messages and notifications update live across all tabs without polling.',
        'WhatsApp-style chat hub — two-pane layout with conversation list and active chat, live per-conversation unread badges, read receipts, and file attachment support.',
        'Document management — private Cloudinary storage, magic-byte file type validation, and 15-minute signed download URLs so documents are never publicly accessible.',
        'Notification system — real-time delivery for case updates and messages, per-item and bulk mark-as-read, with live unread badges; sidebar counts for unread messages, notifications, and action-required cases update in real time.',
        'Admin team management — create advisor accounts, assign to cases, view per-advisor case-load, reset passwords, and suspend or reactivate accounts; client and admin can be logged in simultaneously in one browser via separate auth cookies.',
      ],
      tech: 'Next.js 16 · TypeScript · Supabase Auth · Supabase Realtime Chat · PostgreSQL · Cloudinary · shadcn/ui · Tailwind CSS v4 · Zod · Vercel',
    },
    {
      name: 'NCD Health AI',
      tagline: 'Healthcare Screening PWA',
      description:
        'A clinical screening tool for detecting non-communicable diseases, deployed in South Africa. Healthcare workers collect patient vitals and symptoms, the app runs AI inference and generates a structured health report, and public health administrators monitor aggregate risk data through a regional dashboard.',
      highlights: [
        'Offline-capable AI inference — 7 condition-specific TensorFlow.js models run entirely in the browser with no server round-trip, functional in areas with no connectivity; the same models run server-side on FastAPI as a fallback for low-powered devices.',
        'Offline submission queue — submissions captured without connectivity are stored in IndexedDB and auto-delivered via the Background Sync API when connection restores, with no user action required.',
        'Push notifications — healthcare workers opt in to VAPID push, admins send targeted messages by district or risk level, and open rates are tracked via service worker click events.',
        '24-hour follow-up reminders — BullMQ schedules a reminder job per submission with a stable job ID to prevent duplicates on retry, plus a daily sweep job for weekly and monthly reminders.',
        'Jurisdiction-based admin dashboard — regional admins see aggregate risk data, case breakdowns, and heatmaps scoped strictly to their district, enforced at the database query level in every repository function.',
        'Feedback loop — patients report whether they consulted a clinician and whether the AI assessment was accurate, feeding back into report accuracy metrics visible to admins.',
        'PWA with Workbox service worker — cache-first for static assets, network-first with offline HTML fallback, and reliable cache invalidation via postMessage broadcast on SW activate to reload stale tabs.',
      ],
      tech: 'React · Vite · TypeScript · Express.js · FastAPI · Drizzle ORM · PostgreSQL · TensorFlow.js · BullMQ · Redis · Supabase Realtime · Workbox · VAPID Push · Railway · Vercel',
    },
    {
      name: 'Theranope',
      tagline: 'Mental Healthcare SaaS for Online Therapy',
      description:
        'A full SaaS platform connecting psychology patients with licensed therapists for real-time online therapy — text, audio, and video sessions, appointment booking, session tracking, and digital case history, with a React Native mobile app planned for a future phase.',
      highlights: [
        'Appointment booking system with therapist availability, scheduling, and reminders so patients and therapists can reserve real-time sessions.',
        'Multi-modal sessions — text, audio, and video therapy delivered in-app, with real-time chat persisted for continuity of care.',
        'Digital case history and session tracking — therapists record notes and follow a patient\'s progress across sessions in a structured timeline.',
        'Separate role experiences for patients and therapists, each scoped to only the data and actions relevant to them.',
        'Architected for a future React Native mobile app sharing the same backend APIs.',
      ],
      tech: 'Next.js, Node.js, Express.js, PostgreSQL, MongoDB (Chat), Cloudinary, ShadCN',
    },
    {
      name: 'JacSkills',
      tagline: 'Courses & Training Institute Website',
      description:
        'A website for a professional skills institute, built with Next.js and Supabase.',
      highlights: [
        'Built-in admin dashboard that lets the team edit services, courses, and team members directly — so content stays current without touching code.',
        'Structured course and service pages with a clean, responsive layout and branded visual identity.',
        'Supabase-backed content so every update from the dashboard reflects live on the site instantly.',
      ],
      tech: 'Next.js, Supabase',
    },
    {
      name: 'Arshad Auto Workshop',
      tagline: 'Luxury Car Services & Maintenance Hub',
      description:
        'A branded website for a German luxury car service center, built with Next.js and Firebase.',
      highlights: [
        'Service showcase and gallery highlighting work on Range Rover, Audi, BMW, Mercedes, Porsche and more.',
        'Booking/enquiry flow so customers can request services directly from the site.',
        'Firebase-backed data and hosting for fast, reliable delivery.',
      ],
      tech: 'Next.js, Firebase',
    },
  ],

  products: [
    {
      name: 'FluxIdeas',
      tagline: 'Multi-Agent AI Market Research Engine',
      url: 'https://fluxideas.com',
      achievement: 'Top 10 — HEC GenAI Hackathon, May 2026 (8th place)',
      status: 'In progress — join the waitlist at fluxideas.com',
      description:
        'A production SaaS that autonomously mines the internet to discover real validated problems people are complaining about and turns them into a structured investor-grade market research report in under 5 minutes. A user enters a domain or industry, nine AI agents run in sequence, and the output is a full research dossier with a downloadable PDF report and PPTX pitch deck.',
      highlights: [
        'Nine-agent LangGraph pipeline — Scout scrapes HackerNews, Researcher mines Reddit and DuckDuckGo, Reasoner clusters complaints into problem patterns (Claude Haiku), Analyst runs deep market analysis (Claude Sonnet), Strategist generates MVP and go-to-market strategy, Economist estimates TAM/SAM/SOM from live web data, Designer generates UI mockups via Pollinations.ai, Critic runs an adversarial red-team risk audit, and Reporter produces the PDF and PPTX — fully autonomous with no human selection step.',
        "Real-time agent feed via WebSocket — Python posts each agent event to the Node.js backend, which fans it out to the user's active connection by search ID, streaming a live log of what each agent is doing and finding.",
        'Professional document generation — ReportLab produces a structured PDF report and python-pptx a full pitch deck PPTX, both downloadable from the report detail page.',
        'Full auth and dashboard — Better Auth cookie sessions, protected routes, research history with delete, and a report detail view showing validated problems, market sizing, MVP suggestions, competitor gaps, and risk audit.',
        'Monorepo across three deployed services — React frontend on Vercel, Node.js API on Railway, Python agent pipeline on Railway — managed with pnpm workspaces and Turborepo.',
      ],
      tech: 'React 19 · TypeScript · Node.js 22 · Express 5 · FastAPI · Python 3.12 · LangGraph · Claude AI (Haiku + Sonnet) · Drizzle ORM · PostgreSQL · Better Auth · WebSockets · ReportLab · python-pptx · Cloudinary · Turborepo · Railway · Vercel',
    },
    {
      name: 'RoastMyWork',
      tagline: 'Anonymous Feedback Platform',
      url: 'https://roastmy.work',
      status: 'Live at roastmy.work — 20+ active users, open beta',
      description:
        'A community platform where people get brutally honest anonymous feedback on their websites, apps, designs, startup ideas, and resumes. Instead of polite feedback from friends, users get real unfiltered opinions from strangers — scored on a scale from Mild to Destroyed.',
      highlights: [
        'Anonymous roast system — users submit their work and receive feedback from the community; submitters see feedback without knowing who wrote it, and reviewers roast without their identity being revealed.',
        'Roast scoring system — each roast is scored on a five-level scale (Mild, Spicy, Hot, Brutal, Destroyed), giving submitters a quantified signal of how harsh the feedback is overall.',
        'Roast Battle mode — two pieces of work compete head-to-head with the community voting on which is stronger, an engagement mechanic beyond simple feedback.',
        'Community leaderboard — top roasters ranked by volume and quality of feedback given, incentivising contribution rather than just consumption.',
        'Pro subscription — Polar-powered subscription tier unlocking additional features, the first monetisation layer on a live product with real paying users.',
      ],
      tech: 'Next.js · Node.js · Express.js · SSE · Cloudinary · Better Auth · Polar',
    },
  ],

  education: [
    {
      degree: 'Bachelor in Computer Science',
      institution: 'Virtual University of Pakistan',
      date: 'April 2024 – Present',
      location: 'Islamabad, Pakistan',
    },
    {
      degree: 'Associate Degree Program in Science',
      institution: 'Islamabad College for Boys G-6/3',
      date: 'September 2020 – April 2023',
      location: 'Islamabad, Pakistan',
    },
  ],

  courses: [{ name: 'Front End Development', provider: 'Udemy', date: 'October 2024' }],

  languages: ['English', 'Urdu'],
}
