import { readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const SLOT_TO_FILENAME = {
  logo: "logo.svg",
  "hero-main": "hero-main.jpg",
  "hero-video": "hero-video.mp4",
  "gallery-1": "gallery-1.jpg",
  "gallery-2": "gallery-2.jpg",
  "gallery-3": "gallery-3.jpg",
  "gallery-4": "gallery-4.jpg",
  "solution-result": "solution-result.jpg",
  "how-it-works": "how-it-works.jpg",
  washable: "washable.jpg",
};

const EXT_TO_TYPE = {
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
};

function getTypeFromExt(ext) {
  return EXT_TO_TYPE[ext?.toLowerCase()] || "application/octet-stream";
}

function buildManifest() {
  const mediaDir = join(process.cwd(), "public", "media");
  const files = {};
  const present = {};

  if (existsSync(mediaDir)) {
    for (const file of readdirSync(mediaDir)) {
      const fullPath = join(mediaDir, file);
      if (statSync(fullPath).isFile()) {
        files[file] = {
          url: `/media/${file}`,
          type: getTypeFromExt(file.split(".").pop()),
        };
        present[file] = true;
      }
    }
  }

  const slots = {};
  for (const [slot, expectedName] of Object.entries(SLOT_TO_FILENAME)) {
    if (files[expectedName]) {
      slots[slot] = { ...files[expectedName], exists: true };
    } else {
      slots[slot] = { exists: false };
    }
  }

  return { slots, present };
}

export default function mediaManifestPlugin() {
  const virtualId = "virtual:media-manifest";
  const resolvedId = "\0" + virtualId;

  let manifest = buildManifest();

  return {
    name: "media-manifest",
    resolveId(id) {
      if (id === virtualId) return resolvedId;
      return null;
    },
    load(id) {
      if (id === resolvedId) {
        return `export const MEDIA_MANIFEST = ${JSON.stringify(manifest)};`;
      }
      return null;
    },
    buildStart() {
      manifest = buildManifest();
    },
    handleHotUpdate(ctx) {
      if (ctx.file.includes("public/media/")) {
        manifest = buildManifest();
        const mod = ctx.server.moduleGraph.getModuleById(resolvedId);
        if (mod) {
          ctx.server.reloadModule(mod);
        }
      }
    },
  };
}
