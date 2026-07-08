import { motion } from "framer-motion";
import { Truck, ShieldCheck, RotateCcw, Phone } from "lucide-react";

const badges = [
  { icon: Truck, text: "توصيل سريع", sub: "24-72 ساعة" },
  { icon: ShieldCheck, text: "دفع آمن", sub: "عند الاستلام" },
  { icon: RotateCcw, text: "إرجاع مضمون", sub: "خلال 7 أيام" },
  { icon: Phone, text: "دعم 24/7", sub: "نتواصلو معاك" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-ink-100 bg-ink-50/60 py-4">
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-2.5 rounded-2xl border border-ink-100 bg-white px-3 py-2.5 shadow-soft sm:gap-3 sm:px-4 sm:py-3"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-xs font-bold text-ink-900 sm:text-sm">
                    {b.text}
                  </div>
                  <div className="truncate text-[10px] text-ink-500 sm:text-xs">
                    {b.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
