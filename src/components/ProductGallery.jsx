import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import {
  ProductMainSVG,
  DoorWithSealSVG,
  DustProblemSVG,
  InsectProblemSVG,
} from "../illustrations/Illustrations";
import { useMediaSlot, useMediaActions } from "../context/MediaContext";

const FALLBACK = [
  { id: "fallback-1", name: "المنتج", component: ProductMainSVG, desc: "سدادة اسفل الباب" },
  { id: "fallback-2", name: "مركّب", component: DoorWithSealSVG, desc: "كيفاش كيبان في الباب" },
  { id: "fallback-3", name: "التفاصيل", component: DustProblemSVG, desc: "كيسد الغبار" },
  { id: "fallback-4", name: "الحماية", component: InsectProblemSVG, desc: "كصد الحشرات" },
];

export default function ProductGallery() {
  const gallery1 = useMediaSlot("gallery-1");
  const gallery2 = useMediaSlot("gallery-2");
  const gallery3 = useMediaSlot("gallery-3");
  const gallery4 = useMediaSlot("gallery-4");

  const uploaded = [gallery1, gallery2, gallery3, gallery4].filter(Boolean);
  const useFallback = uploaded.length === 0;

  const gallery = useFallback
    ? FALLBACK
    : uploaded.map((m, i) => ({
        id: `uploaded-${i}`,
        name: `صورة ${i + 1}`,
        url: m.url,
        type: m.type,
        desc: FALLBACK[i]?.desc || "",
      }));

  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const item = gallery[active];
  const isVideo = item?.type?.startsWith("video/");

  const next = () => setActive((i) => (i + 1) % gallery.length);
  const prev = () => setActive((i) => (i - 1 + gallery.length) % gallery.length);

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-5xl container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="section-title text-balance">
            شوف المنتج م بصور عادية جدا
          </h2>
          <p className="section-subtitle mx-auto max-w-xl">
            صور حقيقية للمنتج وكيفاش كيبان مركّب على الباب
          </p>
        </motion.div>

        <div className="mt-8">
          <motion.div className="relative mx-auto aspect-square max-w-2xl overflow-hidden rounded-2xl border border-ink-100 bg-gradient-to-br from-ink-50 to-white shadow-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="grid h-full w-full place-items-center"
              >
                {useFallback ? (
                  <item.component className="h-full w-full" />
                ) : isVideo ? (
                  <video
                    src={item.url}
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {gallery.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink-800 shadow-soft transition-all hover:bg-white"
                  aria-label="السابق"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink-800 shadow-soft transition-all hover:bg-white"
                  aria-label="التالي"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </>
            )}

            {!isVideo && !useFallback && (
              <button
                onClick={() => setZoom(true)}
                className="absolute bottom-3 left-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-700 shadow-soft transition-all hover:bg-white"
                aria-label="تكبير"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            )}

            <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white">
              {item.desc || item.name}
            </div>
          </motion.div>

          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
              {gallery.map((g, i) => {
                const isVideoThumb = g.type?.startsWith("video/");
                return (
                  <button
                    key={g.id || i}
                    onClick={() => setActive(i)}
                    className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-white p-1 transition-all ${
                      active === i
                        ? "border-brand-500 shadow-glow"
                        : "border-ink-100 opacity-70 hover:opacity-100"
                    }`}
                    aria-label={g.name}
                  >
                    {useFallback ? (
                      <g.component className="h-full w-full" />
                    ) : isVideoThumb ? (
                      <div className="relative h-full w-full bg-black">
                        <video
                          src={g.url}
                          className="h-full w-full object-cover"
                          muted
                        />
                        <div className="absolute inset-0 grid place-items-center">
                          <div className="grid h-7 w-7 place-items-center rounded-full bg-white/90">
                            ▶
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={g.url}
                        alt={g.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {zoom && item && !isVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-50 grid cursor-zoom-out place-items-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-square w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-2"
            >
              <img
                src={item.url}
                alt={item.name}
                className="h-full w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
