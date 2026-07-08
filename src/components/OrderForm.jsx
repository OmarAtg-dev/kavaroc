import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  MapPin,
  Home,
  CheckCircle2,
  Loader2,
  Lock,
  ChevronLeft,
  Package,
  Truck,
  Banknote,
  MessageCircle,
  Copy,
} from "lucide-react";
import { product, cities, contact } from "../data/content";
import { ProductMainSVG } from "../illustrations/Illustrations";
import { useMediaSlot } from "../context/MediaContext";

const initialForm = {
  name: "",
  phone: "",
  city: "",
  address: "",
  quantity: 1,
  notes: "",
};

const STORAGE_KEY = "kavaroc_orders";

function saveLocally(order) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push(order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return true;
  } catch {
    return false;
  }
}

function buildWhatsAppLink(order) {
  const date = new Date(order.createdAt);
  const dateStr = date.toLocaleDateString("fr-MA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const timeStr = date.toLocaleTimeString("fr-MA", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sep = "━━━━━━━━━━━━━━━━━━";
  const sub = "───────────────────";
  const unitPrice = product.price.current;
  const total = order.total;

  let msg = `${sep}
*🛒  KAVAROC  —  طلب جديد*
${sep}

🆔 *رقم الطلب*
   \`${order.id}\`

${sub}
*👤  معلومات الزبون*
${sub}
الاسم      →  ${order.name}
الهاتف     →  ${order.phone}

${sub}
*📍  عنوان التوصيل*
${sub}
المدينة    →  ${order.city}
العنوان    →  ${order.address}

${sub}
*🛍️  تفاصيل الطلب*
${sub}
المنتج     →  ${product.name}
الكمية     →  ${order.quantity} × ${unitPrice} درهم
*المجموع*  →  *${total} درهم*`;

  if (order.notes && order.notes.trim()) {
    msg += `

${sub}
*📝  ملاحظات*
${sub}
${order.notes}`;
  }

  msg += `

${sep}
⏰  ${dateStr}  —  ${timeStr}
${sep}`;

  return `https://wa.me/${contact.phoneIntl}?text=${encodeURIComponent(msg)}`;
}

export default function OrderForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [orderId, setOrderId] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [copied, setCopied] = useState(false);
  const heroImage = useMediaSlot("hero-main");

  const subtotal = product.price.current * form.quantity;
  const shipping = 0;

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 3) {
      errs.name = "الرجاء إدخال الاسم الكامل";
    }
    const phoneClean = form.phone.replace(/\s/g, "");
    if (!/^0[5-7][0-9]{8}$/.test(phoneClean)) {
      errs.phone = "رقم الهاتف غير صحيح (مثال: 0612345678)";
    }
    if (!form.city) {
      errs.city = "الرجاء اختيار المدينة";
    }
    if (!form.address.trim() || form.address.trim().length < 5) {
      errs.address = "الرجاء إدخال العنوان";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      const firstErr = document.querySelector("[data-error='true']");
      firstErr?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("loading");

    const id = "KAV-" + Date.now().toString(36).toUpperCase();
    const order = {
      id,
      createdAt: new Date().toISOString(),
      ...form,
      total: subtotal,
    };

    saveLocally(order);
    window.dispatchEvent(new Event("orders-updated"));

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "purchase", order_id: id, value: subtotal });
    }

    await new Promise((r) => setTimeout(r, 700));
    setOrderId(id);
    setWhatsappLink(buildWhatsAppLink(order));
    setStatus("success");

    setTimeout(() => {
      window.open(buildWhatsAppLink(order), "_blank", "noopener,noreferrer");
    }, 600);
  };

  const inc = () => handleChange("quantity", Math.min(5, form.quantity + 1));
  const dec = () => handleChange("quantity", Math.max(1, form.quantity - 1));

  const copyOrderId = () => {
    navigator.clipboard?.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section
      id="order"
      className="relative overflow-hidden bg-gradient-to-b from-white to-brand-50/30 py-14 sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-100/40 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            🛒 أطلب الآن
          </span>
          <h2 className="section-title mt-3 text-balance">
            كمل الطلب ديالك
          </h2>
          <p className="section-subtitle mx-auto max-w-xl">
            غادي نتصلو بيك لتأكيد الطلب. الدفع ملي يوصلك المنتج.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-brand-200 bg-white p-6 text-center shadow-card sm:p-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#25D366]/15"
                  >
                    <CheckCircle2 className="h-10 w-10 text-[#25D366]" />
                  </motion.div>
                  <h3 className="mt-5 text-2xl font-black text-ink-900">
                    تم تأكيد الطلب! 🎉
                  </h3>
                  <p className="mt-2 text-ink-600">
                    شكراً لك يا{" "}
                    <span className="font-bold text-ink-900">{form.name}</span>
                  </p>

                  <div className="mx-auto mt-5 max-w-sm rounded-2xl border border-ink-100 bg-ink-50/50 p-4 text-right">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-500">رقم الطلب</span>
                      <button
                        onClick={copyOrderId}
                        className="flex items-center gap-1.5 font-bold text-ink-900 transition-colors hover:text-brand-600"
                      >
                        {copied ? "✓ تم النسخ" : orderId}
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-ink-500">المبلغ</span>
                      <span className="font-bold text-ink-900">
                        {subtotal} {product.price.currency}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-ink-500">المدينة</span>
                      <span className="font-bold text-ink-900">
                        {form.city}
                      </span>
                    </div>
                  </div>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-[#1da855] sm:text-lg"
                  >
                    <MessageCircle className="h-5 w-5 fill-current" />
                    أرسل الطلب عبر واتساب
                  </a>

                  <p className="mt-4 text-xs text-ink-500">
                    ⏱️ غادي نتصلو بيك في أقل من 24 ساعة لتأكيد الطلب
                  </p>
                  <p className="mt-1 text-xs text-ink-500">
                    أو تواصل معنا مباشرة:{" "}
                    <a
                      href={`tel:${contact.phone}`}
                      className="font-bold text-brand-600 hover:underline"
                      dir="ltr"
                    >
                      {contact.phone}
                    </a>
                  </p>

                  <button
                    onClick={() => {
                      setStatus("idle");
                      setForm(initialForm);
                    }}
                    className="btn-secondary mt-6"
                  >
                    طلب جديد
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-6"
                  noValidate
                >
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-ink-800">
                        الاسم الكامل <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="مثال: محمد العلوي"
                          data-error={!!errors.name}
                          className={`w-full rounded-xl border bg-white px-10 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-all focus:outline-none focus:ring-2 ${
                            errors.name
                              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                              : "border-ink-200 focus:border-brand-500 focus:ring-brand-100"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-ink-800">
                        رقم الهاتف <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          placeholder="06XXXXXXXX"
                          dir="ltr"
                          data-error={!!errors.phone}
                          className={`w-full rounded-xl border bg-white px-10 py-3 text-left text-sm text-ink-900 placeholder:text-ink-400 transition-all focus:outline-none focus:ring-2 ${
                            errors.phone
                              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                              : "border-ink-200 focus:border-brand-500 focus:ring-brand-100"
                          }`}
                        />
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-ink-500">
                          +212
                        </span>
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-ink-800">
                        المدينة <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                        <select
                          value={form.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          data-error={!!errors.city}
                          className={`w-full appearance-none rounded-xl border bg-white px-10 py-3 text-sm text-ink-900 transition-all focus:outline-none focus:ring-2 ${
                            errors.city
                              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                              : "border-ink-200 focus:border-brand-500 focus:ring-brand-100"
                          } ${form.city ? "" : "text-ink-400"}`}
                        >
                          <option value="">اختر مدينتك</option>
                          {cities.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
                          ⌄
                        </span>
                      </div>
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-600">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-ink-800">
                        العنوان <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Home className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-ink-400" />
                        <textarea
                          value={form.address}
                          onChange={(e) =>
                            handleChange("address", e.target.value)
                          }
                          placeholder="الحي، الشارع، الرقم..."
                          rows={2}
                          data-error={!!errors.address}
                          className={`w-full resize-none rounded-xl border bg-white px-10 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-all focus:outline-none focus:ring-2 ${
                            errors.address
                              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                              : "border-ink-200 focus:border-brand-500 focus:ring-brand-100"
                          }`}
                        />
                      </div>
                      {errors.address && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-ink-800">
                        ملاحظات (اختياري)
                      </label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => handleChange("notes", e.target.value)}
                        placeholder="أي تفاصيل إضافية..."
                        rows={2}
                        className="w-full resize-none rounded-xl border border-ink-200 bg-white px-3 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-ink-800">
                        الكمية
                      </label>
                      <div className="inline-flex items-center rounded-xl border border-ink-200 bg-white p-1">
                        <button
                          type="button"
                          onClick={dec}
                          disabled={form.quantity <= 1}
                          className="grid h-9 w-9 place-items-center rounded-lg text-ink-700 transition-colors hover:bg-ink-50 disabled:opacity-40"
                          aria-label="إنقاص"
                        >
                          −
                        </button>
                        <span className="min-w-10 text-center text-base font-bold text-ink-900">
                          {form.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={inc}
                          disabled={form.quantity >= 5}
                          className="grid h-9 w-9 place-items-center rounded-lg text-ink-700 transition-colors hover:bg-ink-50 disabled:opacity-40"
                          aria-label="زيادة"
                        >
                          +
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-ink-500">
                        {form.quantity >= 2
                          ? "🎁 عرض خاص: كل قطعة إضافية بـ 79 درهم فقط"
                          : "زيد وحدة للاستفادة من العرض"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary mt-6 w-full py-4 text-base sm:text-lg"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        جاري إرسال الطلب...
                      </>
                    ) : (
                      <>
                        تأكيد الطلب
                        <ChevronLeft className="h-5 w-5" />
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-center text-xs text-ink-500">
                    بعد التأكيد، غادي يتفتح واتساب أوتوماتيكياً باش تبعث التفاصيل
                  </p>

                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-ink-500">
                    <Lock className="h-3.5 w-3.5" />
                    معلوماتك آمنة معنا
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-20 space-y-4">
              <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-ink-100">
                    {heroImage ? (
                      <img
                        src={heroImage.url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ProductMainSVG className="h-full w-full" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-extrabold text-ink-900 sm:text-base">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs text-ink-500">
                      {product.shortDesc}
                    </p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-black text-brand-600">
                        {product.price.current} {product.price.currency}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-2 border-t border-ink-100 pt-4 text-sm">
                  <div className="flex items-center justify-between text-ink-600">
                    <span>المجموع الفرعي</span>
                    <span className="font-bold text-ink-900">
                      {subtotal} {product.price.currency}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-ink-600">
                    <span>التوصيل</span>
                    <span className="font-bold text-brand-600">مجاني</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-ink-100 pt-3">
                    <span className="text-base font-extrabold text-ink-900">
                      المجموع
                    </span>
                    <span className="text-xl font-black text-brand-600">
                      {subtotal + shipping} {product.price.currency}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4">
                <div className="space-y-2.5 text-sm text-ink-800">
                  <div className="flex items-center gap-2.5">
                    <Banknote className="h-4 w-4 shrink-0 text-brand-600" />
                    <span>الدفع عند الاستلام</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Truck className="h-4 w-4 shrink-0 text-brand-600" />
                    <span>توصيل في 24-72 ساعة</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Package className="h-4 w-4 shrink-0 text-brand-600" />
                    <span>تغليف محكم ومأمون</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
