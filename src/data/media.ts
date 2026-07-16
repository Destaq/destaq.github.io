export type MediaCategory = "profile" | "project" | "creative";

export type MediaItem = {
  id: string;
  title: string;
  category: MediaCategory;
  src: string;
  alt: string;
  width: number;
  height: number;
  sourceNote: string;
  privacy: string;
};

export const curatedMedia: MediaItem[] = [
  {
    id: "profile-square",
    title: "Profile Portrait",
    category: "profile",
    src: "/media/profile/simon-profile-square.jpg",
    alt: "Simon Ilincev smiling in a square profile portrait.",
    width: 840,
    height: 840,
    sourceNote: "Copied from a curated profile photo and stripped of metadata.",
    privacy: "Public profile use. No draft text or document content.",
  },
  {
    id: "profile-professional",
    title: "Professional Portrait",
    category: "profile",
    src: "/media/profile/simon-professional.jpg",
    alt: "Simon Ilincev standing against a light studio wall.",
    width: 1200,
    height: 1800,
    sourceNote: "Copied from a curated professional portrait and stripped of metadata.",
    privacy: "Public profile use. No draft text or document content.",
  },
  {
    id: "profile-paris",
    title: "Paris Portrait",
    category: "profile",
    src: "/media/profile/simon-paris.jpg",
    alt: "Simon Ilincev seated at a cafe table in Paris.",
    width: 1024,
    height: 768,
    sourceNote: "Copied from an existing site image and stripped of phone metadata.",
    privacy: "Lifestyle/profile image. EXIF and location metadata removed.",
  },
  {
    id: "profile-biking",
    title: "Biking",
    category: "profile",
    src: "/media/profile/simon-biking.jpg",
    alt: "Simon Ilincev riding a bicycle outdoors.",
    width: 1400,
    height: 1050,
    sourceNote: "Copied from an existing site image and stripped of GPS metadata.",
    privacy: "Lifestyle/profile image. EXIF and location metadata removed.",
  },
  {
    id: "coldcraft-poster",
    title: "ColdCraft Poster",
    category: "project",
    src: "/media/projects/coldcraft-poster.jpg",
    alt: "ColdCraft project poster with winter game artwork.",
    width: 1000,
    height: 1500,
    sourceNote: "Copied from an existing portfolio image and resized for public use.",
    privacy: "Project artwork only. No private draft material.",
  },
  {
    id: "chess-opening-graph",
    title: "Chess Opening Graph",
    category: "project",
    src: "/media/projects/chess-opening-graph.png",
    alt: "Circular visualization of chess opening lines.",
    width: 1147,
    height: 800,
    sourceNote: "Copied from an existing portfolio visualization.",
    privacy: "Project visualization only. No personal document content.",
  },
  {
    id: "lingotrack-launch",
    title: "Lingotrack Launch",
    category: "project",
    src: "/media/projects/lingotrack-launch.png",
    alt: "Lingotrack launch and Product Hunt screenshots arranged together.",
    width: 1600,
    height: 883,
    sourceNote: "Copied from a curated project screenshot and resized for public use.",
    privacy: "Public launch/project material. Review visible third-party UI before wide reuse.",
  },
  {
    id: "hackathon-win",
    title: "Hackathon Win",
    category: "project",
    src: "/media/projects/hackathon-win.png",
    alt: "Hackathon result screenshot showing a project win.",
    width: 1400,
    height: 834,
    sourceNote: "Copied from a curated coding/project image and resized for public use.",
    privacy: "Public achievement material. Review visible names or organizations before wide reuse.",
  },
  {
    id: "eloquence-concept",
    title: "Eloquence Concept",
    category: "creative",
    src: "/media/creative/eloquence-concept.jpg",
    alt: "Concept art of a river boat with a small visual reference sketch.",
    width: 1400,
    height: 1050,
    sourceNote: "Copied from a visual-only project reference image; no manuscript notes were copied.",
    privacy: "Safe representation for Eloquence. Does not publish manuscript prose, notes, or PDFs.",
  },
  {
    id: "watershed-writing-desk",
    title: "Watershed Writing Desk",
    category: "creative",
    src: "/media/creative/watershed-writing-desk.jpg",
    alt: "Writing desk image used as a safe representation for a script project.",
    width: 1400,
    height: 569,
    sourceNote: "Copied from an existing site image instead of publishing script PDFs.",
    privacy: "Safe representation for Watershed. Does not publish raw PDFs, manuscript text, or drafts.",
  },
  {
    id: "books-and-drafts",
    title: "Books and Drafts",
    category: "creative",
    src: "/media/creative/books-and-drafts.jpg",
    alt: "Books and writing materials arranged on a table.",
    width: 1200,
    height: 900,
    sourceNote: "Copied from an existing site image as general creative-project atmosphere.",
    privacy: "General creative image. No raw drafts or private manuscript text.",
  },
];

export const mediaByCategory = curatedMedia.reduce(
  (groups, item) => {
    groups[item.category].push(item);
    return groups;
  },
  { profile: [], project: [], creative: [] } as Record<MediaCategory, MediaItem[]>,
);
