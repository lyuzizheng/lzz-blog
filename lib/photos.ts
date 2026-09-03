/**
 * BRAWUKA-38 → The Darkroom seed collection.
 * Curated exclusively from owner-published blog images (no external stock,
 * no fabricated scenes). Dimensions measured with `sips`; file sizes from
 * disk. Camera EXIF was stripped at publish time, so the EXIF probe shows
 * file-level telemetry plus the publishing source — never invented bodies,
 * lenses, or exposure values.
 */

export interface PhotoSource {
  label: string;
  href: string;
}

export interface DarkroomPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  sizeKB: number;
  title: string;
  source: PhotoSource;
  exifStripped: true;
}

export const DARKROOM_PHOTOS: DarkroomPhoto[] = [
  {
    id: "P-01",
    src: "/posts/essay/summary_2023/photography.jpg",
    width: 1170,
    height: 1558,
    sizeKB: 1908,
    title: "photography · 2023 总结配图",
    source: { label: "Essay: 2023 总结", href: "/posts/essay/summary_2023" },
    exifStripped: true,
  },
  {
    id: "P-02",
    src: "/posts/essay/summary_2022/photo_street.jpg",
    width: 5912,
    height: 3943,
    sizeKB: 1316,
    title: "photo_street · 2022 总结配图",
    source: { label: "Essay: 2022 总结", href: "/posts/essay/summary_2022" },
    exifStripped: true,
  },
  {
    id: "P-03",
    src: "/static/bike-780454.jpg",
    width: 4032,
    height: 3024,
    sizeKB: 1517,
    title: "bike · 生活存档",
    source: { label: "Blog 静态存档", href: "/posts" },
    exifStripped: true,
  },
  {
    id: "P-04",
    src: "/static/love-4dd6a9.jpg",
    width: 5000,
    height: 2500,
    sizeKB: 627,
    title: "love · 生活存档",
    source: { label: "Blog 静态存档", href: "/posts" },
    exifStripped: true,
  },
  {
    id: "P-05",
    src: "/static/yiyi-e493a3.jpg",
    width: 3000,
    height: 2001,
    sizeKB: 1718,
    title: "yiyi · 生活存档",
    source: { label: "Blog 静态存档", href: "/posts" },
    exifStripped: true,
  },
  {
    id: "P-06",
    src: "/static/work-e7a729.JPG",
    width: 4032,
    height: 3024,
    sizeKB: 1781,
    title: "work · 生活存档",
    source: { label: "Blog 静态存档", href: "/posts" },
    exifStripped: true,
  },
  {
    id: "P-07",
    src: "/static/badminton-30db2b.jpg",
    width: 1170,
    height: 908,
    sizeKB: 1011,
    title: "badminton · 生活存档",
    source: { label: "Essay: 2023 总结", href: "/posts/essay/summary_2023" },
    exifStripped: true,
  },
  {
    id: "P-08",
    src: "/static/overtime-a9b3f7.JPG",
    width: 4030,
    height: 2300,
    sizeKB: 1382,
    title: "overtime · 生活存档",
    source: { label: "Blog 静态存档", href: "/posts" },
    exifStripped: true,
  },
  {
    id: "P-09",
    src: "/static/drama-d3b802.JPG",
    width: 1280,
    height: 1820,
    sizeKB: 814,
    title: "drama · 生活存档",
    source: { label: "Blog 静态存档", href: "/posts" },
    exifStripped: true,
  },
  {
    id: "P-10",
    src: "/static/jiaqian-9af712.jpeg",
    width: 639,
    height: 538,
    sizeKB: 19,
    title: "jiaqian · 生活存档",
    source: { label: "Blog 静态存档", href: "/posts" },
    exifStripped: true,
  },
];

export function aspectRatio(photo: DarkroomPhoto): string {
  return `${photo.width} / ${photo.height}`;
}
