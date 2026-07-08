import { useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn, Sparkles, X } from "lucide-react";
import { useMediaSlot } from "../context/MediaContext";

export default function Solution() {
  const resultImg = useMediaSlot("solution-result");
  const [zoom, setZoom] = useState(false);

  return (
    <section className="bg-ink-50/40 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            ✨ النتيجة
          </span>
          <h2 className="section-title mt-3 text-balance">
            شوف الفرق مع Kavaroc
          </h2>
          <p className="section-subtitle mx-auto max-w-xl">
            سدادة بسيطة وفعّالة، تركيب في دقيقة وحدة، نتيجة فورية
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <div className="group relative overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-card">
            <div className="relative aspect-[4/3] w-full">
              {resultImg ? (
                <img
                  src={resultImg.url}
                  alt="النتيجة مع Kavaroc"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-gradient-to-br from-brand-50 to-brand-100/40">
                  <div className="text-center">
                    <Sparkles className="mx-auto h-12 w-12 text-brand-500" />
                    <p className="mt-3 text-sm font-bold text-ink-700">
                      ارفع صورة للمنتج مركّب على الباب
                    </p>
                    <p className="mt-1 text-xs text-ink-500">
                      من زر 🖼️ في الأسفل (بعد تسجيل دخول الأدمن)
                    </p>
                  </div>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-brand-200/50" />
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white shadow-glow">
                <Sparkles className="h-3 w-3" />
                مع Kavaroc
              </span>
            </div>

            {resultImg && (
              <div className="absolute bottom-3 left-3">
                <button
                  onClick={() => setZoom(true)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-700 shadow-soft transition-all hover:bg-white"
                  aria-label="تكبير"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { val: "سهل", label: "تركيب في دقيقة" },
              { val: "محكم", label: "سد الفراغات" },
              { val: "متانة", label: "مادة عالية الجودة" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-ink-100 bg-white p-4 text-center shadow-soft"
              >
                <div className="text-2xl font-black text-brand-600 sm:text-3xl">
                  {s.val}
                </div>
                <div className="mt-1 text-xs text-ink-600 sm:text-sm">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {zoom && resultImg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setZoom(false)}
          className="fixed inset-0 z-50 grid cursor-zoom-out place-items-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <button
            onClick={() => setZoom(false)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink-700 transition-all hover:bg-white"
            aria-label="إغلاق"
          >
            <X className="h-5 w-5" />
          </button>
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            src={resultImg.url}
            alt="النتيجة مع Kavaroc"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
          />
        </motion.div>
      )}
    </section>
  );
}
