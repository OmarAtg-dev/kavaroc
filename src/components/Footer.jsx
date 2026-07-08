import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { product, contact } from "../data/content";
import BrandLogo from "./BrandLogo";

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-50/40 pt-12 pb-24 sm:pb-12">
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo iconSize="xxl" />
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              {product.tagline}. الجودة والثقة أولوية ديالنا.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-ink-900">روابط مفيدة</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-600">
              <li>
                <a href="#benefits" className="hover:text-brand-600">المميزات</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-brand-600">آراء الزبناء</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-600">الأسئلة الشائعة</a>
              </li>
              <li>
                <a href="#order" className="hover:text-brand-600">اطلب الآن</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-ink-900">تواصل معنا</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-600">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-600" />
                <a href={`tel:+212${contact.phone.slice(1)}`} dir="ltr">
                  {contact.phone}
                </a>
              </li>
              {/* <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-600" />
                {contact.email}
              </li> */}
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-600" />
                المغرب
              </li>
            </ul>
          </div>

          {/* <div>
            <h3 className="text-sm font-extrabold text-ink-900">تابعنا</h3>
            <div className="mt-3 flex gap-2">
              <a
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 transition-all hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 transition-all hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={contact.whatsapp}
                className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 transition-all hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-ink-200 bg-white px-2.5 py-1 text-[10px] font-bold text-ink-700">
                الدفع عند الاستلام
              </span>
              <span className="rounded-full border border-ink-200 bg-white px-2.5 py-1 text-[10px] font-bold text-ink-700">
                توصيل 24-72h
              </span>
            </div>
          </div> */}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-ink-200 pt-6 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Kavaroc. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <button
              onClick={() =>
                window.dispatchEvent(new Event("open-privacy"))
              }
              className="hover:text-ink-700"
            >
              سياسة الخصوصية
            </button>
            <a href="#faq" className="hover:text-ink-700">الأسئلة الشائعة</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
