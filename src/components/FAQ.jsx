import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { faqs } from "../data/content";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="bg-ink-50/40 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-bold text-ink-700">
            <HelpCircle className="h-3.5 w-3.5" />
            الأسئلة الشائعة
          </span>
          <h2 className="section-title mt-3 text-balance">
            عندك سؤال؟ هنا الجواب
          </h2>
          <p className="section-subtitle mx-auto max-w-xl">
            الأجوبة على الأسئلة اللي كيطرحوها الزبناء بزاف
          </p>
        </motion.div>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`overflow-hidden rounded-2xl border bg-white shadow-soft transition-all ${
                  isOpen
                    ? "border-brand-200 shadow-card"
                    : "border-ink-100"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-extrabold text-ink-900 sm:text-base">
                    {f.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all ${
                      isOpen
                        ? "bg-brand-500 text-white"
                        : "bg-ink-100 text-ink-700"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="border-t border-ink-100 px-5 py-4 text-sm leading-relaxed text-ink-600 sm:text-base">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
