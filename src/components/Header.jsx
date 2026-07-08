import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import BrandLogo from "./BrandLogo";

const links = [
  { label: "المميزات", href: "#benefits" },
  { label: "كيفاش كيخدم", href: "#how" },
  { label: "الأسئلة", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-soft"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between container-px sm:h-24">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2"
        >
          <BrandLogo iconSize="xl" />
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                handleNav(l.href);
              }}
              className="text-sm font-semibold text-ink-700 transition-colors hover:text-brand-600"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNav("#order")}
            className="hidden items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-bold text-white shadow-glow transition-all hover:bg-brand-600 sm:inline-flex"
          >
            <ShoppingCart className="h-4 w-4" />
            اطلب الآن
          </button>
          <button
            onClick={() => setOpen((s) => !s)}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 text-ink-800 transition-all hover:bg-ink-50 md:hidden"
            aria-label="القائمة"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-ink-100 bg-white md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(l.href);
                  }}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-ink-800 transition-colors hover:bg-ink-50"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => handleNav("#order")}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-4 py-3 text-sm font-bold text-white shadow-glow transition-all hover:bg-brand-600"
              >
                <ShoppingCart className="h-4 w-4" />
                اطلب الآن
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
