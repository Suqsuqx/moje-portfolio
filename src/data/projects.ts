export type Discipline =
  | "product-design"
  | "graphic-design"
  | "art-illustration"
  | "writing";

export type ProjectAsset = {
  type: "image" | "video" | "gif";
  src: string;
  alt?: string;
  caption?: string;
};

export type Project = {
  id: string;
  discipline: Discipline;
  title: string;
  subtitle?: string;
  description?: string;
  year?: string;
  role?: string;
  areas?: string[];
  featured?: boolean;
  assets: ProjectAsset[];
};

const project = (
  id: string,
  discipline: Discipline,
  title: string,
): Project => ({ id, discipline, title, assets: [] });

export const projects: Project[] = [
  project("stipendly", "product-design", "Stipendly"),
  project("Fluna", "product-design", "Fluna"),
  project("Poket by GradientFi", "product-design", "Poket by GradientFi"),
  project("safeword", "product-design", "SafeWord"),
  project("Bare", "product-design", "Bare"),
  project("illustrated-tracks", "graphic-design", "Illustrated Tracks"),
  project("ake-festival", "graphic-design", "Ake Festival"),
  project("selected-brand-systems", "graphic-design", "Selected Brand Systems"),
  project("editorial-illustration", "art-illustration", "Editorial Illustration"),
  project("figures-faces", "art-illustration", "Figures & Faces"),
  project("worlds-experiments", "art-illustration", "Worlds / Experiments"),
  project("now", "writing", "Now"),
  project("under-the-skin", "writing", "Under the Skin"),
  project("product-design-notes", "writing", "Product / Design Notes"),
];

export const disciplineLabels: Record<Discipline, string> = {
  "product-design": "Product Design",
  "graphic-design": "Graphic Design",
  "art-illustration": "Art / Illustration",
  writing: "Writing",
};
