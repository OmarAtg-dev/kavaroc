export const mediaConfig = {
  logo: { path: "/media/logo.svg", accept: [".svg", ".png", ".jpg", ".webp"] },
  "hero-main": { path: "/media/hero-main.jpg", accept: [".jpg", ".jpeg", ".png", ".webp"] },
  "hero-video": { path: "/media/hero-video.mp4", accept: [".mp4", ".webm", ".mov"] },
  "gallery-1": { path: "/media/gallery-1.jpg", accept: [".jpg", ".jpeg", ".png", ".webp"] },
  "gallery-2": { path: "/media/gallery-2.jpg", accept: [".jpg", ".jpeg", ".png", ".webp"] },
  "gallery-3": { path: "/media/gallery-3.jpg", accept: [".jpg", ".jpeg", ".png", ".webp"] },
  "gallery-4": { path: "/media/gallery-4.jpg", accept: [".jpg", ".jpeg", ".png", ".webp"] },
  "solution-result": { path: "/media/solution-result.jpg", accept: [".jpg", ".jpeg", ".png", ".webp"] },
  "how-it-works": { path: "/media/how-it-works.jpg", accept: [".jpg", ".jpeg", ".png", ".webp"] },
  washable: { path: "/media/washable.jpg", accept: [".jpg", ".jpeg", ".png", ".webp"] },
};

export function getMediaConfig(slotId) {
  return mediaConfig[slotId] || null;
}
