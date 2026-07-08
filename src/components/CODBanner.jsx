import { motion } from "framer-motion";
import { Banknote, Truck, Phone } from "lucide-react";

const items = [
  {
    icon: Banknote,
    title: "الدفع عند الاستلام",
    desc: "كتخلص غير ملي يوصلك المنتج. بلا أي دفع مسبق.",
  },
  {
    icon: Truck,
    title: "التوصيل لجميع المدن",
    desc: "كنوصّلو لكل المدن المغربية، من الشمال للجنوب.",
  },
  {
    icon: Phone,
    title: "تأكيد عبر واتساب",
    desc: "ابعت طلبك مباشرة عبر واتساب. رانا هنا لخدمتك.",
  },
];

export default function CODBanner() {
  return (
    <section className="bg-gradient-to-l from-brand-500 via-brand-600 to-brand-700 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-black text-white sm:text-3xl md:text-4xl">
            اطلب الآن وخلص ملي يوصلك
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-brand-50/90 sm:text-base">
            خدمة آمنة، توصيل سريع، ودعم 24/7
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white/10 p-5 backdrop-blur-sm transition-all hover:bg-white/15 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-brand-600 shadow-glow">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-white sm:text-lg">
                      {it.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-50/90">
                      {it.desc}
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
