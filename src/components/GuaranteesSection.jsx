import { motion } from "framer-motion";
import {
  Shield,
  RotateCcw,
  MessageCircle,
  Truck,
  Check,
  X,
  Sparkles,
} from "lucide-react";

const promises = [
  {
    icon: Shield,
    title: "جودة مضمونة",
    desc: "عازل عالي الجودة. كنختارو بنفسي.",
  },
  {
    icon: RotateCcw,
    title: "إرجاع مجاني",
    desc: "إلا ما عجبكش، اتصل بنا خلال 24 ساعة. بلا أسئلة.",
  },
  {
    icon: MessageCircle,
    title: "دعم 7/7",
    desc: "متاحين على واتساب كل يوم باش نجاوبوك.",
  },
  {
    icon: Truck,
    title: "توصيل لكل المدن",
    desc: "كنوصّلو لجميع المدن المغربية، من الشمال للجنوب.",
  },
];

const comparison = [
  { text: "عازل عالي الجودة كيدوم طويل", kavaroc: true },
  { text: "تصميم محكم كيسد كل الفراغات", kavaroc: true },
  { text: "قابل للغسل في آلة الغسيل", kavaroc: true },
  { text: "سهل التركيب، بلا أدوات", kavaroc: true },
  { text: "دعم سريع على واتساب", kavaroc: true },
  { text: "مواد رخيصة كتشقق بعد أسابيع", kavaroc: false },
  { text: "ما كيسدش الفراغات مزيان", kavaroc: false },
  { text: "كيخرج العازل من الجناب", kavaroc: false },
];

export default function GuaranteesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-brand-50/30 py-14 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-1/2 h-72 w-72 translate-x-1/2 rounded-full bg-brand-100/40 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            <Sparkles className="h-3.5 w-3.5" />
            وعدنا ليك
          </span>
          <h2 className="section-title mt-3 text-balance">
            كيضمن ليك Kavaroc
          </h2>
          <p className="section-subtitle mx-auto max-w-xl">
            4 وعود باش نطمّنوك قبل ما تطلب
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-5 text-center shadow-soft transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
              >
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-extrabold text-ink-900 sm:text-lg">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card"
        >
          <div className="border-b border-ink-100 bg-gradient-to-l from-brand-50 to-white p-5 text-center sm:p-6">
            <h3 className="text-xl font-black text-ink-900 sm:text-2xl">
              علاش Kavaroc مختلف؟
            </h3>
            <p className="mt-1 text-sm text-ink-600">
              شوف الفرق بين Kavaroc و العازلات الرخيصة اللي كاينين فالسوق
            </p>
          </div>

          <div className="grid gap-3 p-5 sm:p-6 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center gap-2 px-2">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
                <span className="text-sm font-extrabold text-brand-700">
                  مع Kavaroc
                </span>
              </div>
              <ul className="space-y-2">
                {comparison
                  .filter((c) => c.kavaroc)
                  .map((c, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50/60 p-3"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm font-semibold text-ink-800">
                        {c.text}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 px-2">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-red-100 text-red-600">
                  <X className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
                <span className="text-sm font-extrabold text-red-700">
                  العازلات الرخيصة
                </span>
              </div>
              <ul className="space-y-2">
                {comparison
                  .filter((c) => !c.kavaroc)
                  .map((c, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/40 p-3"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-200 text-red-700">
                        <X className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-ink-500 line-through">
                        {c.text}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
