import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, CheckCircle2, Loader2 } from "lucide-react";
import { getMedia as getIndexedMedia } from "../lib/mediaDB";
import JSZip from "jszip";

const STORAGE_KEY = "kavaroc_media_export_pending";

export default function ExportModal({ open, onClose }) {
  const [items, setItems] = useState([]);
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) {
      setItems([]);
      setExporting(false);
      setDone(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const loadItems = async () => {
    const list = [];
    const slots = JSON.parse(localStorage.getItem("kavaroc_media_slots") || "[]");
    for (const slotId of slots) {
      try {
        const blob = await getIndexedMedia(slotId);
        if (blob) {
          list.push({ slotId, blob, type: blob.type });
        }
      } catch {}
    }
    setItems(list);
  };

  useEffect(() => {
    if (open) loadItems();
  }, [open]);

  const getExt = (type) => {
    if (type?.includes("svg")) return "svg";
    if (type?.includes("video")) return "mp4";
    if (type?.includes("png")) return "png";
    if (type?.includes("webp")) return "webp";
    return "jpg";
  };

  const getFilename = (slotId, type) => {
    if (slotId === "logo") return `logo.svg`;
    if (slotId === "hero-main") return `hero-main.jpg`;
    if (slotId === "hero-video") return `hero-video.mp4`;
    if (slotId.startsWith("gallery-")) return `gallery-${slotId.split("-")[1]}.jpg`;
    if (slotId === "solution-result") return `solution-result.jpg`;
    if (slotId === "how-it-works") return `how-it-works.jpg`;
    if (slotId === "washable") return `washable.jpg`;
    return `${slotId}.${getExt(type)}`;
  };

  const getPublicPath = (slotId, type) => `/media/${getFilename(slotId, type)}`;

  const buildManifest = () => {
    const manifest = {
      generatedAt: new Date().toISOString(),
      files: items.map((it) => ({
        slot: it.slotId,
        path: getPublicPath(it.slotId, it.type),
        type: it.type,
        size: it.blob.size,
      })),
    };
    return JSON.stringify(manifest, null, 2);
  };

  const handleExport = async () => {
    if (items.length === 0) return;
    setExporting(true);
    try {
      const zip = new JSZip();
      for (const it of items) {
        const filename = getFilename(it.slotId, it.type);
        zip.file(filename, it.blob);
      }
      zip.file("MANIFEST.json", buildManifest());

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kavaroc-media-${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      setDone(true);
    } catch (err) {
      console.error(err);
      alert("فشل التصدير: " + err.message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink-100 p-4">
              <h3 className="text-lg font-extrabold text-ink-900">
                تصدير الصور إلى المشروع
              </h3>
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-full text-ink-500 hover:bg-ink-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              {done ? (
                <div className="text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-100">
                    <CheckCircle2 className="h-8 w-8 text-brand-600" />
                  </div>
                  <h4 className="mt-3 text-base font-extrabold text-ink-900">
                    تم التصدير بنجاح!
                  </h4>
                  <p className="mt-1 text-sm text-ink-600">
                    فك ضغط الـ ZIP و ضع الملفات فـ <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs">public/media/</code> فـ المشروع ديالك، ثم دير <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs">npm run build</code>
                  </p>
                  <button
                    onClick={onClose}
                    className="btn-primary mt-4 w-full"
                  >
                    فهمت
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-sm text-ink-500">
                    ما كاين حتى ملف محفوظ محلياً. ارفع شي صورة أولاً.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-ink-600">
                    غادي نصدّر <strong>{items.length}</strong> ملف(ات) كـ ZIP جاهز
                    للوضع فـ <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs">public/media/</code>
                  </p>
                  <ul className="mt-3 max-h-40 space-y-1 overflow-y-auto rounded-xl border border-ink-100 bg-ink-50/40 p-3 text-xs">
                    {items.map((it) => (
                      <li key={it.slotId} className="flex items-center justify-between">
                        <code className="text-ink-700">
                          public/media/{getFilename(it.slotId, it.type)}
                        </code>
                        <span className="text-ink-500">
                          {(it.blob.size / 1024).toFixed(0)} KB
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={handleExport}
                    disabled={exporting}
                    className="btn-primary mt-4 w-full"
                  >
                    {exporting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        كنصدّرو...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        تصدير ZIP
                      </>
                    )}
                  </button>

                  <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[11px] text-amber-800">
                    <strong>بعد التصدير:</strong>
                    <ol className="ms-4 mt-1 list-decimal space-y-0.5">
                      <li>فك ضغط الـ ZIP مباشرة داخل <code>public/media/</code></li>
                      <li>الملفات خاصهم يبانو بحال: <code>public/media/logo.svg</code></li>
                      <li>شغّل <code>npm run build</code></li>
                      <li>ارفع التغييرات على Git ودير deploy</li>
                    </ol>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
