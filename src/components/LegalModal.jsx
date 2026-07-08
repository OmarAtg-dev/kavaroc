import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Shield,
  Database,
  Share2,
  UserCheck,
  Cookie,
  Lock,
  Mail,
  Calendar,
  Printer,
} from "lucide-react";

const LAST_UPDATED = "2026-07-08";

const sections = [
  {
    icon: Shield,
    title: "1. مقدمة",
    body: (
      <>
        <p>
          مرحبا بكم فـ <strong>Kavaroc</strong>. خصوصيتك مهمة لينا. هاد السياسة
          كتبين كيفاش كنجمعو، كنستعملو، وكنحميو المعلومات الشخصية ديالك.
        </p>
        <p>
          باستعمالك لموقعنا، كتافق على هاد السياسة. إلا ما كتافقش، نرجوك
          ما تستعملش الموقع.
        </p>
        <p className="text-xs text-ink-500">
          هاد السياسة كتخضع للقانون المغربي رقم 09-08 المتعلق بحماية الأشخاص
          الذاتيين اتجاه معالجة المعطيات ذات الطابع الشخصي، وتحت إشراف
          اللجنة الوطنية لمراقبة حماية المعطيات الشخصية (CNDP).
        </p>
      </>
    ),
  },
  {
    icon: Database,
    title: "2. شنو المعلومات اللي كنجمعو منك؟",
    body: (
      <>
        <p>عند ما كتدير طلب عندنا، كنجمعو هاد المعلومات:</p>
        <ul className="list-disc space-y-1 pe-5">
          <li><strong>الاسم الكامل</strong> — باش نعرفو شكون أنت</li>
          <li><strong>رقم الهاتف</strong> — باش نتواصلو معاك على الطلب</li>
          <li><strong>المدينة</strong> — باش نوصّلو للمنطقة ديالك</li>
          <li><strong>العنوان</strong> — باش يوصلك التوصيل</li>
          <li><strong>ملاحظات (اختيارية)</strong> — أي تفاصيل إضافية</li>
        </ul>
        <p className="text-xs text-ink-500">
          ما كنجمعوش معلومات بنكية ديالك. الدفع كيكون نقدا عند الاستلام.
        </p>
      </>
    ),
  },
  {
    icon: UserCheck,
    title: "3. كيفاش كنستعملو هاد المعلومات؟",
    body: (
      <>
        <p>كنستعملو معلوماتك غير لـ:</p>
        <ul className="list-disc space-y-1 pe-5">
          <li>تأكيد طلبك و الاتصال بيك</li>
          <li>توصيل المنتج للعنوان اللي بغيتي</li>
          <li>التواصل معاك إلا كان شي مشكل فـ الطلب</li>
          <li>تحسين خدماتنا</li>
        </ul>
        <p className="text-xs text-ink-500">
          ما كنستعملوش معلوماتك للتسويق المباشر بلا إذن صريح منك.
        </p>
      </>
    ),
  },
  {
    icon: Lock,
    title: "4. فين كنخزّنو معلوماتك؟",
    body: (
      <>
        {/* <p>
          <strong>التخزين المحلي (المتصفح ديالك):</strong> الطلبات اللي كتكتبو
          كيتسجلو فـ متصفحك فقط (localStorage و IndexedDB). هاد البيانات ما
          كتبقاش فـ السيرفر ديالنا — كتبقى فـ جهازك أنت.
        </p> */}
        <p>
          <strong>واتساب:</strong> ملي كتكمل الطلب، كيتفتح واتساب باش تبعث
          التفاصيل. هاد الرسائل كتوصل لينا على الرقم{" "}
          <strong dir="ltr">0771541962</strong> وكتسجل فـ تطبيق واتساب ديالك.
        </p>
        <p className="text-xs text-ink-500">
          ⚠️ تنبيه: البيانات فـ المتصفح ديالك مربوطة بجهازك. إلا بغيتي تمسحها،
          تقدر تديرها من إعدادات المتصفح (Clear browsing data).
        </p>
      </>
    ),
  },
  {
    icon: Share2,
    title: "5. واش كنشاركو معلوماتك مع شي حد؟",
    body: (
      <>
        <p>
          <strong>لا، ما كنبيعوش معلوماتك.</strong> المعلومات اللي كنديرو غير لـ:
        </p>
        <ul className="list-disc space-y-1 pe-5">
          <li>
            <strong>شريك التوصيل</strong> — غير الاسم، التلفون، المدينة و العنوان
            باش يوصّلولك الطلب
          </li>
          <li>
            <strong>السلطات المغربية</strong> — إلا طُلب منّا قانونياً
          </li>
        </ul>
        <p className="text-xs text-ink-500">
          ما كنشاركوش مع شركات تسويق، ما نديروش إعلانات موجهة، و ما نبيعوش
          البيانات ديالك بأي شكل من الأشكال.
        </p>
      </>
    ),
  },
  {
    icon: UserCheck,
    title: "6. حقوقك (موافقا مع القانون 09-08)",
    body: (
      <>
        <p>عندك الحق فـ:</p>
        <ul className="list-disc space-y-1 pe-5">
          <li>
            <strong>الوصول</strong> — تعرف شنو عندا من المعلومات عليك
          </li>
          <li>
            <strong>التصحيح</strong> — تصلح أي معلومة غالطة
          </li>
          <li>
            <strong>المسح</strong> — تطلب منا نمسيحو معلوماتك
          </li>
          <li>
            <strong>الاعتراض</strong> — تعترض على الاستعمال ديال معلوماتك
          </li>
          <li>
            <strong>النقل</strong> — تستافد من معلوماتك فـ صيغة قابلة للقراءة
          </li>
        </ul>
        {/* <p className="text-xs text-ink-500">
          باش تطبق هاد الحقوق، تواصل معنا على الرقم{" "}
          <strong dir="ltr">0771541962</strong> ولا على البريد{" "}
          <strong>contact@kavaroc.ma</strong>. عندك حتى الحق تدي شكاية لـ{" "}
          <strong>CNDP</strong> (اللجنة الوطنية لمراقبة حماية المعطيات
          الشخصية).
        </p> */}
      </>
    ),
  },
  {
    icon: Cookie,
    title: "7. ملفات تعريف الارتباط (Cookies)",
    body: (
      <>
        <p>
          الموقع ما كيستعملش cookies للتتبع ولا الإعلانات. غير{" "}
          <strong>localStorage و IndexedDB</strong> فـ المتصفح ديالك باش:
        </p>
        <ul className="list-disc space-y-1 pe-5">
          <li>نحفظو الطلبات ديالك محليا</li>
          <li>نحفظو صور المنتج و الفيديو اللي رافعين</li>
          {/* <li>نتذكرو أنك دخلتي كأدمن</li> */}
        </ul>
        <p className="text-xs text-ink-500">
          تقدر تمسح هاد البيانات فـ أي وقت من إعدادات المتصفح ديالك.
        </p>
      </>
    ),
  },
  {
    icon: Lock,
    title: "8. كيفاش كنحميو معلوماتك؟",
    body: (
      <>
        <p>
          كناخدو احتياطات معقولة باش نحميو معلوماتك:
        </p>
        <ul className="list-disc space-y-1 pe-5">
          <li>التواصل عبر واتساب (مشفّر end-to-end)</li>
          <li>ما كنحفظوش بيانات فـ سيرفرات خارجية</li>
          <li>لوحة الأدمن محمية بكلمة سر</li>
        </ul>
        <p className="text-xs text-ink-500">
          ⚠️ لكن ما كاينش نظام أمان مثالي 100٪. المرجو ما تشارش معلومات
          حساسة عبر القنوات ديالنا.
        </p>
      </>
    ),
  },
  {
    icon: Calendar,
    title: "9. التعديلات على هاد السياسة",
    body: (
      <p>
        نقدرو نعدّلو هاد السياسة من وقت لآخر. التعديلات غادي تنزل فـ هاد
        الصفحة مع التاريخ الجديد. إلا كتستعمل الموقع من بعد التعديلات، هادشي
        كيعني أنك وافقتي عليها.
      </p>
    ),
  },
  {
    icon: Mail,
    title: "10. تواصل معنا",
    body: (
      <>
        <p>عندك سؤال على الخصوصية؟ تواصل معنا:</p>
        <ul className="space-y-1 pe-5">
          <li>
            📞 <strong>الهاتف:</strong>{" "}
            <a href="tel:0771541962" className="text-brand-600 hover:underline" dir="ltr">
              0771541962
            </a>
          </li>
          {/* <li>
            📧 <strong>البريد الإلكتروني:</strong>{" "}
            <a href="mailto:contact@kavaroc.ma" className="text-brand-600 hover:underline">
              contact@kavaroc.ma
            </a>
          </li> */}
          <li>
            💬 <strong>واتساب:</strong>{" "}
            <a
              href="https://wa.me/212771541962"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline"
              dir="ltr"
            >
              +212 771-541962
            </a>
          </li>
        </ul>
        <p className="text-xs text-ink-500">
          كنباوبو عليك فـ أقل من 48 ساعة.
        </p>
      </>
    ),
  },
];

export default function LegalModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-ink-200 bg-white shadow-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-2xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-ink-100 bg-gradient-to-l from-brand-50 to-white p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500 text-white shadow-glow">
                  <Shield className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-black text-ink-900 sm:text-lg">
                    سياسة الخصوصية
                  </h3>
                  <p className="text-[11px] text-ink-500 sm:text-xs">
                    آخر تحديث: {LAST_UPDATED}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => window.print()}
                  className="grid h-9 w-9 place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-700"
                  aria-label="طباعة"
                  title="طباعة"
                >
                  <Printer className="h-4 w-4" />
                </button>
                <button
                  onClick={onClose}
                  className="grid h-9 w-9 place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-700"
                  aria-label="إغلاق"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              <div className="mb-5 rounded-xl border border-brand-200 bg-brand-50 p-4">
                <p className="text-xs font-bold text-brand-800">
                  🇲🇦 هاد السياسة كتخضع للقانون المغربي 09-08 و إرشادات
                  الـ CNDP
                </p>
              </div>

              <div className="space-y-6">
                {sections.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <section key={i}>
                      <h4 className="mb-3 flex items-center gap-2 text-base font-black text-ink-900 sm:text-lg">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-600">
                          <Icon className="h-4 w-4" />
                        </span>
                        {s.title}
                      </h4>
                      <div className="space-y-3 text-sm leading-relaxed text-ink-700 sm:text-[15px]">
                        {s.body}
                      </div>
                    </section>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-ink-100 pt-5 text-center text-xs text-ink-500">
                <p>
                  © {new Date().getFullYear()} Kavaroc. جميع الحقوق محفوظة.
                </p>
                {/* <p className="mt-1">
                  هاد السياسة كتبقا خاضعة للقانون المغربي رقم 09-08.
                </p> */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
