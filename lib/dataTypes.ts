// lib/dataTypes.ts

export type TechStack = {
  name: string;
  url: string;
};

export type Project = {
  id : string;
  type: string;
  title: string;
  company: string;
  desc: string;
  imageUrl: string;
  videoUrl?: string | null;
  techStack: { name: string; url: string }[];
  linkUrl: string;
};