import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { contact } from "../data/content";

export default function WhatsAppButton() {
  const [showTip, setShowTip] = useState(false);
  const message = encodeURIComponent(
    "سلام، عندي سؤال على منتج Kavaroc"
  );
  const url = `https://wa.me/${contact.phoneIntl}?text=${message}`;

  return (
    <div className="fixed bottom-24 left-4 z-30 md:bottom-6 md:left-6">
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            className="absolute bottom-16 left-0 w-56 rounded-2xl border border-ink-100 bg-white p-3 text-sm shadow-card"
          >
            <div className="flex items-start gap-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#25D366] text-white">
                <MessageCircle className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="font-bold text-ink-900">عندك سؤال؟</p>
                <p className="mt-0.5 text-xs text-ink-600">
                  تواصل معنا عبر واتساب، رانا هنا لخدمتك.
                </p>
              </div>
              <button
                onClick={() => setShowTip(false)}
                className="text-ink-400 hover:text-ink-700"
                aria-label="إغلاق"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="absolute -bottom-2 left-6 h-3 w-3 rotate-45 border-b border-r border-ink-100 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        onClick={() => setShowTip(false)}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 md:h-16 md:w-16"
        aria-label="تواصل معنا عبر واتساب"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle className="relative h-7 w-7 md:h-8 md:w-8" />
      </a>
    </div>
  );
}
