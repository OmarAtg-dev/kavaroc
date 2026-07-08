import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as mediaDB from "../lib/mediaDB";
import { mediaSlots } from "../lib/mediaSlots";

const MediaContext = createContext(null);

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
        try {
          const blob = await mediaDB.getMedia(slot.id);
          if (blob && !cancelled) {
            const url = URL.createObjectURL(blob);
            objectUrls.push(url);
            newMedia[slot.id] = {
              url,
              type: blob.type,
              size: blob.size,
            };
          }
        } catch {
          // skip slot
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
    setTick((t) => t + 1);
  }, []);

  const remove = useCallback(async (slot) => {
    await mediaDB.deleteMedia(slot);
    setTick((t) => t + 1);
  }, []);

  return (
    <MediaContext.Provider value={{ media, save, remove, loaded, refresh: () => setTick((t) => t + 1) }}>
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
