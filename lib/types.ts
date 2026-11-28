export type ThemeId = "oltin" | "tong" | "yulduz" | "shaftoli" | "albom";

export interface Person {
  id: string;
  name: string;
  /** "Sinf rahbari", "Matematika o‘qituvchisi", "Kelajakda shifokor"... */
  role?: string;
  quote?: string;
  photo?: string;
}

export interface Memory {
  id: string;
  type: "photo" | "video";
  /** image url, youtube/vimeo url or mp4 url */
  src: string;
  /** optional poster for videos */
  poster?: string;
  title?: string;
  caption?: string;
  date?: string;
  /** visual ratio in the mosaic — portrait works nicely for people, wide for places */
  ratio?: "portrait" | "square" | "wide";
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  text?: string;
  /** optional photo shown on the film-strip card */
  photo?: string;
}

export interface Wish {
  id: string;
  name: string;
  text: string;
  createdAt?: string;
}

export interface Vignette {
  slug: string;
  theme: ThemeId;
  school: string;
  className: string;
  graduationYear: number | string;
  motto?: string;
  coverImage: string;
  /** object-position for the cover, e.g. "center 55%" */
  coverPosition?: string;
  /** small label above the class name, e.g. "Navoiy nomidagi 1-maktab" */
  overline?: string;
  letter?: {
    title?: string;
    text: string;
    signature?: string;
    role?: string;
    photo?: string;
  };
  graduates: Person[];
  teachers: Person[];
  memories: Memory[];
  timeline: TimelineItem[];
  wishes: Wish[];
  audioUrl?: string;
  closing?: {
    title?: string;
    text?: string;
  };
  contact?: {
    phone?: string;
    telegram?: string;
  };
}

export type VignetteDraft = Vignette;
