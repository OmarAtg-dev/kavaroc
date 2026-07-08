import { motion } from "framer-motion";
import {
  Snowflake,
  Wind,
  Bug,
  Wrench,
  WashingMachine,
  Star,
  ShieldCheck,
  Truck,
  CreditCard,
  ChevronLeft,
  Play,
  MessageCircle,
} from "lucide-react";
import { ProductMainSVG, VideoPlaceholderSVG } from "../illustrations/Illustrations";
import { product, benefits } from "../data/content";
import { useMediaSlot } from "../context/MediaContext";

const iconMap = { Snowflake, Wind, Bug, Wrench, WashingMachine };

export default function Hero() {
  const heroImage = useMediaSlot("hero-main");
  const heroVideo = useMediaSlot("hero-video");

  const scrollToOrder = () => {
    const el = document.querySelector("#order");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-white via-white to-brand-50/40 pt-24 pb-12 sm:pb-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-brand-100/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl container-px">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 sm:text-sm"
            >
              <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-brand-500" />
              جودة أعلى من اللي كاين فالسوق 🇲🇦
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-balance text-3xl font-black leading-tight text-ink-900 sm:text-4xl md:text-5xl"
            >
              وقف تسرب الهواء ديال
              <span className="relative mx-2 inline-block text-brand-600">
                الباب ديالك
                <svg
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 left-0 h-3 w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q 50 2 100 6 T 198 6"
                    stroke="#22c55e"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              مرة وحدة
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-4 max-w-xl text-base text-ink-600 sm:text-lg lg:mx-0"
            >
              {product.tagline}. عازل متين، تصميم محكم، تركيب فـ دقيقة
              وحدة. الدفع ملي يوصلك للباب ديالك.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3"
            >
              {benefits.map((b, i) => {
                const Icon = iconMap[b.icon];
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 rounded-2xl border border-ink-100 bg-white px-3 py-2.5 shadow-soft"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-bold text-ink-800 sm:text-sm">
                      {b.title}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-start"
            >
              <div className="text-center sm:text-right">
                <div className="flex items-baseline justify-center gap-2 sm:justify-start">
                  <span className="text-4xl font-black text-ink-900 sm:text-5xl">
                    {product.price.current}
                  </span>
                  <span className="text-base font-bold text-ink-600">
                    {product.price.currency}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink-500 sm:text-sm">
                  شامل التوصيل + الدفع عند الاستلام
                </p>
              </div>

              <button onClick={scrollToOrder} className="btn-primary w-full sm:w-auto sm:px-8">
                اطلب الآن
                <ChevronLeft className="h-5 w-5" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink-500 sm:justify-start sm:text-sm"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="font-bold text-ink-700">جودة عالية</span>
                <span className="text-ink-500">عازل متين</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-brand-600" />
                توصيل لكل المدن
              </div>
              <div className="flex items-center gap-1.5">
                <CreditCard className="h-4 w-4 text-brand-600" />
                الدفع عند الاستلام
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                تأكيد عبر واتساب
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-square max-w-xl overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card">
              {heroImage ? (
                <img
                  src={heroImage.url}
                  alt="Kavaroc سدادة اسفل الباب"
                  className="h-full w-full object-cover animate-float"
                  loading="eager"
                />
              ) : (
                <div className="absolute inset-0 animate-float">
                  <ProductMainSVG className="h-full w-full" />
                </div>
              )}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute -top-2 right-2 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink-800 shadow-card sm:right-8"
              >
                <ShieldCheck className="h-4 w-4 text-brand-600" />
                جودة مضمونة
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="absolute bottom-4 left-2 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink-800 shadow-card sm:left-8"
              >
                <Bug className="h-4 w-4 text-red-500" />
                يصد الحشرات
              </motion.div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
              {heroVideo ? (
                <div className="relative aspect-[4/3] w-full bg-black">
                  <video
                    src={heroVideo.url}
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    poster={heroImage?.url}
                  />
                </div>
              ) : (
                <>
                  <div className="relative aspect-[4/3] w-full">
                    <VideoPlaceholderSVG className="h-full w-full" />
                    <button
                      className="absolute inset-0 grid place-items-center text-white transition-transform hover:scale-105"
                      aria-label="شغل الفيديو"
                    >
                      <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-brand-600 shadow-glow">
                        <Play className="h-7 w-7 fill-current" />
                      </span>
                    </button>
                  </div>
                  <div className="px-4 py-3 text-center">
                    <p className="text-sm font-bold text-ink-800">
                      شوف كيفاش كيخدم المنتج 🎥
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
