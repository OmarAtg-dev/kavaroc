import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle } from "lucide-react";

export default function PromoBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("promo-dismissed");
    if (dismissed) return;
    const t = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("promo-dismissed", "1");
  };

  const scrollToFAQ = () => {
    dismiss();
    const el = document.querySelector("#faq");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", damping: 22 }}
          className="fixed bottom-24 right-4 z-30 max-w-xs md:bottom-24"
        >
          <div className="relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-4 shadow-card">
            <button
              onClick={dismiss}
              className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-50"
              aria-label="إغلاق"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <HelpCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-ink-900">
                  عندك سؤال؟
                </p>
                <p className="mt-0.5 text-xs text-ink-600">
                  شوف الأجوبة على الأسئلة الشائعة، أو تواصل معنا على واتساب.
                </p>
                <button
                  onClick={scrollToFAQ}
                  className="mt-2 text-xs font-bold text-brand-600 hover:underline"
                >
                  شوف الأسئلة ←
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
