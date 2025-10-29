export interface Project {
  index: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
  smallIntro: string;
  desktopImage?: string;
  mobileImage?: string;
  tabletImage?: string;
  accent: string;
  textDark?: string;
  textLight?: string;
}
export const budgetTracker: Project = {
  index: "02",
  title: "Budget Tracker",
  description:
    "A user-friendly app for managing personal finances. Track income and expenses, categorize transactions, and view insightful summaries to monitor financial health. Secure authentication and responsive design ensure a seamless experience across devices.",
  smallIntro: "Track and manage your personal finances with ease using the Budget Tracker app.",
  techStack: [
    "Next.js 15",
    "TypeScript",
    "Tailwind CSS",
    "Radix UI",
    "React Hook Form",
    "Zod",
    "Auth.js ",
    "MongoDB with Mongoose",
    "Vercel",
    "GitHub",
  ],
  githubLink: "https://github.com/SidorovaMaria/budget_tracker",
  liveLink: "https://budget-tracker-finance.vercel.app/",
  desktopImage: "/images/projects/budget-tracker/Desktop.svg",
  mobileImage: "/images/projects/budget-tracker/Mobile.svg",
  tabletImage: "/images/projects/budget-tracker/Tablet.svg",
  accent: "#3F4F4F",
  textDark: "#CCCBB8",
  textLight: "#1E2727",
};

export const FigmaClone: Project = {
  index: "03",
  title: "Canvo",
  description:
    "A collaborative design tool inspired by Figma, built with Liveblocks for real-time multi-user editing and Fabric.js for advanced canvas rendering. Canvo enables users to create and manipulate shapes, text, and images, supporting selection, movement, resizing, deletion, and property editing. ",
  smallIntro: "A collaborative design tool inspired by Figma, built with Liveblocks and Fabric.js.",
  techStack: [
    "React 19",
    "TypeScript",
    "Next.js 15",
    "Tailwind CSS",
    "Liveblocks",
    "Fabric.js",
    "Radix UI",
    "jsPDF",
    "uuid",
    "Vercel",
    "GitHub",
  ],
  githubLink: "https://github.com/SidorovaMaria/figma-clone",
  liveLink: "https://figma-clone-iota-five.vercel.app/",
  desktopImage: "/images/projects/canvo/Desktop.svg",
  tabletImage: "/images/projects/canvo/Tablet.svg",
  accent: "#4F3F3F",
  textDark: "#CCCBB8",
  textLight: "#1E2727",
};

export const Kanban: Project = {
  index: "04",
  title: "Kanban Board",
  description:
    "A dynamic Kanban board application for task management, featuring drag-and-drop functionality for seamless task organization across customizable columns. Built with React and TypeScript, it offers a responsive design, local storage persistence, and an intuitive user interface for efficient workflow management.",
  smallIntro: "A dynamic Kanban board application for efficient task management and organization.",
  techStack: [
    "React 19",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "motion",
    "uuid",
    "Formik",
    "Yup",
    "Redux",
    "GitHub",
  ],
  githubLink: "https://github.com/SidorovaMaria/Portfolio/tree/main/kanban-task",
  liveLink: "https://portfolio-flax-pi-68.vercel.app/",
  desktopImage: "/images/projects/kanban/Desktop.svg",
  tabletImage: "/images/projects/kanban/Tablet.svg",
  mobileImage: "/images/projects/kanban/Mobile.svg",
  accent: "#4f473f",
  textDark: "#CCCBB8",
  textLight: "#1E2727",
};

const Notes: Project = {
  index: "05",
  title: "Notes App",
  description:
    "A sleek and intuitive notes application designed for seamless note-taking and organization. Featuring a clean interface, users can create, edit, and categorize notes with ease. The app supports markdown formatting, tag-based organization, and a powerful search function to quickly locate notes.",
  smallIntro:
    "A sleek and intuitive notes application designed for seamless note-taking and organization.",
  techStack: [
    "React 19",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "Formik",
    "Yup",
    "Redux",
    "motion",
    "Vercel",
    "GitHub",
  ],
  githubLink: "https://github.com/SidorovaMaria/Portfolio/tree/main/notes",
  liveLink: "https://notes-delta-blue.vercel.app/",
  desktopImage: "/images/projects/notes/Desktop.svg",
  mobileImage: "/images/projects/notes/Mobile.svg",
  tabletImage: "/images/projects/notes/Tablet.svg",
  accent: "#4A3F55",
  textDark: "#CCCBB8",
  textLight: "#1E2727",
};
const SonarStrike: Project = {
  index: "06",
  title: "Sonar Strike",
  description:
    "Sonar Strike is a fast-paced 2D BattleShip game where players engage in strategic naval combat, deploying ships and using sonar to locate and destroy enemy vessels.",
  smallIntro: "A fast-paced 2D BattleShip game with strategic naval combat and CPU opponents.",
  techStack: ["TypeScript", "Phaser", "Webpack", "Babel", "Tailwind CSS", "Jest", "GitHub"],
  githubLink: "https://github.com/SidorovaMaria/sonar-strike",
  liveLink: "https://sonar-strike.vercel.app/",
  desktopImage: "/images/projects/sonar-strike/Desktop.svg",
  accent: "#2F5566",
  textDark: "#CCCBB8",
  textLight: "#1E2727",
};
const BookmarkManager: Project = {
  index: "01",
  title: "Bookmark Manager",
  description:
    "A sleek and efficient Bookmark Manager that allows users to save, organize, and manage their favorite web links with ease. Featuring a clean interface, users can categorize bookmarks into folders, add tags for easy searching, and quickly access their saved sites.",
  smallIntro:
    "A sleek and efficient Bookmark Manager for saving, organizing, and managing web links.",
  techStack: [
    "React 19",
    "Next.js 16",
    "TypeScript",
    "Tailwind CSS",
    "Zod",
    "Radix UI",
    "React Hook Form",
    "Next Themes",
    "MongoDB with Mongoose",
    "Redis",
    "Vitest",
    "Vercel",
    "GitHub",
  ],
  desktopImage: "/images/projects/bookmark-manager/Desktop.svg",
  mobileImage: "/images/projects/bookmark-manager/Mobile.svg",
  tabletImage: "/images/projects/bookmark-manager/Tablet.svg",
  githubLink: "https://github.com/SidorovaMaria/bookmark-manager",
  liveLink: "https://bookmark-manager-gamma-nine.vercel.app/",
  accent: "#55662F",
  textDark: "#CCCBB8",
  textLight: "#1E2727",
};
export const featuredProjects: Project[] = [BookmarkManager, budgetTracker, FigmaClone];

export const AllProjects: Project[] = [
  BookmarkManager,
  budgetTracker,
  FigmaClone,
  Kanban,
  Notes,
  SonarStrike,
];
