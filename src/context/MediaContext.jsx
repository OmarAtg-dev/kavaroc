import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as mediaDB from "../lib/mediaDB";
import { mediaSlots } from "../lib/mediaSlots";
import { MEDIA_MANIFEST } from "virtual:media-manifest";

const MediaContext = createContext(null);

async function getIndexedMedia(slot) {
  try {
    const blob = await mediaDB.getMedia(slot);
    if (!blob) return null;
    return {
      url: URL.createObjectURL(blob),
      type: blob.type,
      size: blob.size,
      source: "indexed",
    };
  } catch {
    return null;
  }
}

export function MediaProvider({ children }) {
  const [media, setMedia] = useState({});
  const [tick, setTick] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const objectUrls = [];

    (async () => {
      const newMedia = {};
      for (const slot of mediaSlots) {
        const staticInfo = MEDIA_MANIFEST?.slots?.[slot.id];
        if (staticInfo?.exists) {
          newMedia[slot.id] = {
            url: staticInfo.url,
            type: staticInfo.type,
            source: "static",
          };
          continue;
        }

        const indexed = await getIndexedMedia(slot.id);
        if (indexed && !cancelled) {
          objectUrls.push(indexed.url);
          newMedia[slot.id] = indexed;
        }
      }
      if (!cancelled) {
        setMedia(newMedia);
        setLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
      objectUrls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [tick]);

  const save = useCallback(async (slot, file) => {
    await mediaDB.saveMedia(slot, file);
    try {
      const list = JSON.parse(localStorage.getItem("kavaroc_media_slots") || "[]");
      if (!list.includes(slot)) {
        list.push(slot);
        localStorage.setItem("kavaroc_media_slots", JSON.stringify(list));
      }
    } catch {}
    setTick((t) => t + 1);
  }, []);

  const remove = useCallback(async (slot) => {
    await mediaDB.deleteMedia(slot);
    try {
      const list = JSON.parse(localStorage.getItem("kavaroc_media_slots") || "[]");
      const next = list.filter((s) => s !== slot);
      localStorage.setItem("kavaroc_media_slots", JSON.stringify(next));
    } catch {}
    setTick((t) => t + 1);
  }, []);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  return (
    <MediaContext.Provider value={{ media, save, remove, loaded, refresh }}>
      {children}
    </MediaContext.Provider>
  );
}

export function useMediaSlot(slot) {
  const ctx = useContext(MediaContext);
  return ctx?.media?.[slot] || null;
}

export function useMediaActions() {
  const ctx = useContext(MediaContext);
  if (!ctx) throw new Error("useMediaActions must be used inside MediaProvider");
  return ctx;
}
