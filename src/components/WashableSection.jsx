import { useState } from "react";
import { motion } from "framer-motion";
import { X, WashingMachine, Check, Sparkles } from "lucide-react";
import { useMediaSlot } from "../context/MediaContext";

const benefits = [
  "قابل للغسل في آلة الغسيل",
  // "ما كيتأثرش بالماء ولا المنظفات",
  "كيبقى مرن ونظيف من بعد الغسيل",
  "سهل التنظيف",
];

export default function WashableSection() {
  const washImg = useMediaSlot("washable");
  const [zoom, setZoom] = useState(false);

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">
              <Sparkles className="h-3.5 w-3.5" />
              ميزة حصرية
            </span>
            <h2 className="section-title mt-3 text-balance">
              قابل للغسل في آلة الغسيل 🫧
            </h2>
            <p className="section-subtitle mt-2 max-w-xl">
              العازل ديالنا مصنوع من مادة عالية الجودة كتسمح ليك تغسلو في آلة
              الغسيل بلا ما تتأثر. يبقى نظيف، مرن، وخدمتو ما كتنقصش.
            </p>

            <ul className="mt-6 space-y-3">
              {benefits.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-3 shadow-soft"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-bold text-ink-800 sm:text-base">
                    {b}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-100 bg-ink-50/50 px-4 py-2 text-xs text-ink-600">
              <WashingMachine className="h-4 w-4 text-cyan-600" />
              اغسلو مع الملابس ديالك. بلا مشاكل.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="group relative mx-auto aspect-square max-w-xl overflow-hidden rounded-3xl border border-ink-100 bg-gradient-to-br from-cyan-50 to-brand-50 shadow-card">
              {washImg ? (
                <img
                  src={washImg.url}
                  alt="العازل قابل للغسل في آلة الغسيل"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="grid h-full w-full place-items-center">
                  <div className="text-center">
                    <WashingMachine className="mx-auto h-16 w-16 text-cyan-500" />
                    <p className="mt-3 text-sm font-bold text-ink-700">
                      ارفع صورة للعازل في آلة الغسيل
                    </p>
                    <p className="mt-1 text-xs text-ink-500">
                      من زر 🖼️ في الأسفل (بعد تسجيل دخول الأدمن)
                    </p>
                  </div>
                </div>
              )}

              {washImg && (
                <button
                  onClick={() => setZoom(true)}
                  className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink-700 opacity-0 shadow-soft transition-all hover:bg-white group-hover:opacity-100"
                  aria-label="تكبير"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM11 7v8M7 11h8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}

              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-cyan-500 px-3 py-1 text-xs font-bold text-white shadow-glow">
                <WashingMachine className="h-3 w-3" />
                قابل للغسل
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {zoom && washImg && (
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
            src={washImg.url}
            alt="العازل قابل للغسل في آلة الغسيل"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
          />
        </motion.div>
      )}
    </section>
  );
}
