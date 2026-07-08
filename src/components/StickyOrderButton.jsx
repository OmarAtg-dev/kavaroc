import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ChevronLeft } from "lucide-react";
import { product } from "../data/content";

export default function StickyOrderButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => {
      const el = document.querySelector("#order");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setShow(rect.top > window.innerHeight * 0.6);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToOrder = () => {
    const el = document.querySelector("#order");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 200 }}
          className="fixed inset-x-0 bottom-0 z-30 px-3 pb-3 safe-bottom md:hidden"
        >
          <div className="mx-auto flex max-w-md items-center gap-2 rounded-2xl border border-ink-100 bg-white/95 p-2 shadow-card backdrop-blur-md">
            <div className="flex-1 px-2 text-right">
              <div className="text-[10px] text-ink-500">السعر</div>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-black text-ink-900">
                  {product.price.current}
                </span>
                <span className="text-xs text-ink-600">
                  {product.price.currency}
                </span>
              </div>
            </div>
            <button
              onClick={scrollToOrder}
              className="btn-primary flex-1 py-3 text-sm"
            >
              <ShoppingCart className="h-4 w-4" />
              اطلب الآن
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
