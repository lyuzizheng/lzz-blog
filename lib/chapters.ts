/**
 * Site-wide chapter negative specifications matching the darkroom homepage.
 * Blogs (/posts) · Career (/resume) · Photography (/photography) · Products (/products)
 */
export const CHAPTER_NEGATIVES = [
  { key: "blogs", label: "Blogs", labelZh: "文章", href: "/posts", frameNo: "01" },
  { key: "career", label: "Career", labelZh: "履历", href: "/resume", frameNo: "02" },
  { key: "photography", label: "Photo", labelZh: "摄影", href: "/photography", frameNo: "03" },
  { key: "projects", label: "Projects", labelZh: "产品", href: "/products", frameNo: "04" },
] as const;
