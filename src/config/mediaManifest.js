import { mediaConfig } from "./media";

const manifest = {
  logo: { path: "/media/logo.svg", type: "image/svg+xml", exists: false },
  "hero-main": { path: "/media/hero-main.jpg", type: "image/jpeg", exists: false },
  "hero-video": { path: "/media/hero-video.mp4", type: "video/mp4", exists: false },
  "gallery-1": { path: "/media/gallery-1.jpg", type: "image/jpeg", exists: false },
  "gallery-2": { path: "/media/gallery-2.jpg", type: "image/jpeg", exists: false },
  "gallery-3": { path: "/media/gallery-3.jpg", type: "image/jpeg", exists: false },
  "gallery-4": { path: "/media/gallery-4.jpg", type: "image/jpeg", exists: false },
  "solution-result": { path: "/media/solution-result.jpg", type: "image/jpeg", exists: false },
  "how-it-works": { path: "/media/how-it-works.jpg", type: "image/jpeg", exists: false },
  washable: { path: "/media/washable.jpg", type: "image/jpeg", exists: false },
};

export default manifest;

export function getStaticMediaList() {
  return Object.entries(manifest).map(([slot, info]) => ({
    slot,
    ...info,
  }));
}

export function getStaticMediaPath(slot) {
  return manifest[slot]?.path || mediaConfig[slot]?.path || null;
}

export function getStaticMediaType(slot) {
  return manifest[slot]?.type || null;
}
