// Sample data for example pages — replace with real data in your prototype

export interface Project {
  id: string;
  name: string;
  status: "active" | "paused" | "completed" | "error";
  owner: string;
  ownerInitials: string;
  progress: number;
  lastUpdated: string;
  description: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: string;
  status: "online" | "offline" | "busy";
  projects: number;
}

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Helix Core Migration",
    status: "active",
    owner: "Alice Chen",
    ownerInitials: "AC",
    progress: 72,
    lastUpdated: "2 hours ago",
    description:
      "Migrating legacy repositories to Helix Core for improved version control.",
    tags: ["infrastructure", "migration"],
  },
  {
    id: "2",
    name: "CI/CD Pipeline Upgrade",
    status: "active",
    owner: "Bob Martinez",
    ownerInitials: "BM",
    progress: 45,
    lastUpdated: "30 min ago",
    description:
      "Upgrading build pipelines to support parallel execution and caching.",
    tags: ["devops", "performance"],
  },
  {
    id: "3",
    name: "Security Audit Q1",
    status: "completed",
    owner: "Carol Park",
    ownerInitials: "CP",
    progress: 100,
    lastUpdated: "1 day ago",
    description:
      "Quarterly security audit covering access controls and vulnerability scanning.",
    tags: ["security", "compliance"],
  },
  {
    id: "4",
    name: "API Gateway Setup",
    status: "paused",
    owner: "David Kim",
    ownerInitials: "DK",
    progress: 30,
    lastUpdated: "3 days ago",
    description:
      "Setting up centralized API gateway for microservices communication.",
    tags: ["infrastructure", "api"],
  },
  {
    id: "5",
    name: "Dashboard Redesign",
    status: "active",
    owner: "Emily Foster",
    ownerInitials: "EF",
    progress: 88,
    lastUpdated: "1 hour ago",
    description:
      "Redesigning the analytics dashboard with improved data visualizations.",
    tags: ["design", "frontend"],
  },
  {
    id: "6",
    name: "Database Optimization",
    status: "error",
    owner: "Frank Lee",
    ownerInitials: "FL",
    progress: 15,
    lastUpdated: "5 hours ago",
    description:
      "Optimizing query performance and indexing strategy for production database.",
    tags: ["database", "performance"],
  },
];

export const SAMPLE_TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Alice Chen",
    initials: "AC",
    email: "alice@example.com",
    role: "Engineering Lead",
    status: "online",
    projects: 3,
  },
  {
    id: "2",
    name: "Bob Martinez",
    initials: "BM",
    email: "bob@example.com",
    role: "DevOps Engineer",
    status: "busy",
    projects: 2,
  },
  {
    id: "3",
    name: "Carol Park",
    initials: "CP",
    email: "carol@example.com",
    role: "Security Analyst",
    status: "online",
    projects: 1,
  },
  {
    id: "4",
    name: "David Kim",
    initials: "DK",
    email: "david@example.com",
    role: "Backend Developer",
    status: "offline",
    projects: 4,
  },
  {
    id: "5",
    name: "Emily Foster",
    initials: "EF",
    email: "emily@example.com",
    role: "UI/UX Designer",
    status: "online",
    projects: 2,
  },
  {
    id: "6",
    name: "Frank Lee",
    initials: "FL",
    email: "frank@example.com",
    role: "DBA",
    status: "offline",
    projects: 1,
  },
];
