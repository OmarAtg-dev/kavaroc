import { useState } from "react";
import { motion } from "framer-motion";
import { X, Wrench, Ruler, CheckCircle2, ImageIcon } from "lucide-react";
import { useMediaSlot } from "../context/MediaContext";
import { howItWorks } from "../data/content";

const iconMap = { 1: Ruler, 2: Wrench, 3: CheckCircle2 };
const colorMap = {
  1: "from-blue-500 to-blue-600",
  2: "from-amber-500 to-amber-600",
  3: "from-brand-500 to-brand-600",
};

export default function HowItWorks() {
  const howImg = useMediaSlot("how-it-works");
  const [zoom, setZoom] = useState(false);

  return (
    <section id="how" className="bg-ink-50/40 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            📋 كيفاش كيخدم
          </span>
          <h2 className="section-title mt-3 text-balance">
            3 خطوات بسيطة و كينتهي
          </h2>
          <p className="section-subtitle mx-auto max-w-xl">
            في أقل من دقيقة، ركّب العازل وتمتع بنتيجة فورية
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <div className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
              {howImg ? (
                <img
                  src={howImg.url}
                  alt="كيفاش كيخدم Kavaroc"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-gradient-to-br from-ink-50 to-brand-50/40">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-ink-300" />
                    <p className="mt-3 text-sm font-bold text-ink-700">
                      ارفع صورة توضح 3 خطوات التركيب
                    </p>
                    <p className="mt-1 text-xs text-ink-500">
                      من زر 🖼️ في الأسفل (بعد تسجيل دخول الأدمن)
                    </p>
                  </div>
                </div>
              )}

              {howImg && (
                <button
                  onClick={() => setZoom(true)}
                  className="absolute bottom-3 left-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-700 opacity-0 shadow-soft transition-all hover:bg-white group-hover:opacity-100"
                  aria-label="تكبير"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM11 7v8M7 11h8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {howItWorks.map((s, i) => {
              const Icon = iconMap[s.step] || CheckCircle2;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative rounded-2xl border border-ink-100 bg-white p-5 shadow-soft"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${colorMap[s.step]} text-white shadow-soft`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-ink-400">
                          {s.step}
                        </span>
                        <h3 className="text-base font-extrabold text-ink-900">
                          {s.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {zoom && howImg && (
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
            src={howImg.url}
            alt="كيفاش كيخدم Kavaroc"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
          />
        </motion.div>
      )}
    </section>
  );
}
