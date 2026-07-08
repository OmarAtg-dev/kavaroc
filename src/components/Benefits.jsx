import { motion } from "framer-motion";
import {
  Zap,
  Maximize2,
  Hammer,
  Shield,
  Wind,
  RotateCcw,
} from "lucide-react";
import { featureCards } from "../data/content";

const iconMap = { Zap, Maximize2, Hammer, Shield, Wind, RotateCcw };

export default function Benefits() {
  return (
    <section id="benefits" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            ⭐ المميزات
          </span>
          <h2 className="section-title mt-3 text-balance">
            علاش هاد المنتج مميز؟
          </h2>
          <p className="section-subtitle mx-auto max-w-xl">
            6 مميزات كتفرق هاد المنتج على أي حل آخر
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((b, i) => {
            const Icon = iconMap[b.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-50/0 transition-colors group-hover:bg-brand-50" />

                <div className="relative flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-extrabold text-ink-900 sm:text-lg">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">
                      {b.desc}
                    </p>
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
