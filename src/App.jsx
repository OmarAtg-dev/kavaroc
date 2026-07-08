import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustBadges from "./components/TrustBadges";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import Benefits from "./components/Benefits";
import WashableSection from "./components/WashableSection";
import HowItWorks from "./components/HowItWorks";
import ProductGallery from "./components/ProductGallery";
import GuaranteesSection from "./components/GuaranteesSection";
import FAQ from "./components/FAQ";
import CODBanner from "./components/CODBanner";
import OrderForm from "./components/OrderForm";
import Footer from "./components/Footer";
import StickyOrderButton from "./components/StickyOrderButton";
import WhatsAppButton from "./components/WhatsAppButton";
import PromoBanner from "./components/PromoBanner";
import AdminOrders from "./components/AdminOrders";
import MediaManager from "./components/MediaManager";
import AdminGate, { useAdminStatus } from "./components/AdminGate";
import LegalModal from "./components/LegalModal";
import { MediaProvider } from "./context/MediaContext";
import { useMediaActions } from "./context/MediaContext";
import { ImagePlus, ShoppingBag } from "lucide-react";

function MediaButton() {
  const [open, setOpen] = useState(false);
  const { media, loaded } = useMediaActions();
  const count = loaded ? Object.keys(media).length : 0;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-16 right-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 shadow-card transition-all hover:bg-ink-50"
        aria-label="إدارة الصور"
        title="إدارة الصور والفيديو"
      >
        <ImagePlus className="h-4 w-4" />
        {count > 0 && (
          <span className="absolute -top-1 -left-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-500 px-1 text-[10px] font-black text-white">
            {count}
          </span>
        )}
      </button>
      <MediaManager open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function useOrdersCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const compute = () => {
      try {
        const data = JSON.parse(localStorage.getItem("kavaroc_orders") || "[]");
        setCount(data.length);
      } catch {
        setCount(0);
      }
    };
    compute();
    const onUpdate = () => compute();
    window.addEventListener("orders-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("orders-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);
  return count;
}

function OrdersButton() {
  const [open, setOpen] = useState(false);
  const count = useOrdersCount();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-16 right-16 z-20 grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 shadow-card transition-all hover:bg-ink-50"
        aria-label="عرض الطلبات"
        title="الطلبات المحلية"
      >
        <ShoppingBag className="h-4 w-4" />
        {count > 0 && (
          <span className="absolute -top-1 -left-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-500 px-1 text-[10px] font-black text-white">
            {count}
          </span>
        )}
      </button>
      <AdminOrders forceOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

function AdminToolbar() {
  const admin = useAdminStatus();
  if (!admin) return null;
  return (
    <>
      <OrdersButton />
      <MediaButton />
    </>
  );
}

function LegalModals() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  useEffect(() => {
    const onTrigger = () => setPrivacyOpen(true);
    window.addEventListener("open-privacy", onTrigger);
    return () => window.removeEventListener("open-privacy", onTrigger);
  }, []);
  return (
    <LegalModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
  );
}

export default function App() {
  return (
    <MediaProvider>
      <div className="relative">
        <Header />
        <main>
          <Hero />
          <TrustBadges />
          <Problem />
          <Solution />
          <Benefits />
          <WashableSection />
          <HowItWorks />
          <ProductGallery />
          <GuaranteesSection />
          <FAQ />
          <CODBanner />
          <OrderForm />
        </main>
        <Footer />
        <StickyOrderButton />
        <WhatsAppButton />
        <PromoBanner />
        <AdminGate />
        <AdminToolbar />
        <LegalModals />
      </div>
    </MediaProvider>
  );
}
