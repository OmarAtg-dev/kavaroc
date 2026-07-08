import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import {
  DustProblemSVG,
  InsectProblemSVG,
  AirLeakProblemSVG,
} from "../illustrations/Illustrations";

const problems = [
  {
    Illustration: DustProblemSVG,
    title: "الغبار كيدخل",
    desc: "الغبار والرمل كيدخلو من تحت الباب وكنخسو الوقت في التنظيف",
    color: "from-amber-50 to-amber-100",
    accent: "text-amber-700",
  },
  {
    Illustration: InsectProblemSVG,
    title: "الحشرات كتدخل",
    desc: "النمل، الصراصير، والحشرات الصغيرة كيدخلو للبيت",
    color: "from-red-50 to-red-100",
    accent: "text-red-700",
  },
  {
    Illustration: AirLeakProblemSVG,
    title: "الهواء البارد كيخرج",
    desc: "الهواء البارد ديال المكيف كيخرج وكيخلي الفاتورة غالية",
    color: "from-blue-50 to-blue-100",
    accent: "text-blue-700",
  },
];

export default function Problem() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
            <AlertCircle className="h-3.5 w-3.5" />
            المشكل
          </span>
          <h2 className="section-title mt-3 text-balance">
            واش هاد المشاكل كاينين عندك؟
          </h2>
          <p className="section-subtitle mx-auto max-w-xl">
            هاد المشاكل الثلاثة كاينين في كل بيت مغربي بلا استثناء
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {problems.map((p, i) => {
            const Illustration = p.Illustration;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 transition-opacity group-hover:opacity-30`}
                />
                <div className="relative">
                  <div className="overflow-hidden rounded-xl">
                    <Illustration className="h-44 w-full" />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-red-100 text-red-600">
                      <span className="text-sm font-black">✕</span>
                    </span>
                    <h3 className={`text-lg font-extrabold ${p.accent}`}>
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-white p-6 text-center sm:p-8"
        >
          <p className="text-lg font-bold text-ink-800 sm:text-xl">
            الحل بسيط وفعال 👇
          </p>
        </motion.div>
      </div>
    </section>
  );
}
