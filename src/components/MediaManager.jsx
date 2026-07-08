import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Trash2, Image as ImageIcon, Video, ImagePlus, Check } from "lucide-react";
import { mediaSlots } from "../lib/mediaSlots";
import { useMediaActions } from "../context/MediaContext";

function formatSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1024 / 1024).toFixed(1) + " MB";
}

function MediaSlot({ slot, current, onSave, onRemove, saving, error }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (slot.maxSizeMB && file.size > slot.maxSizeMB * 1024 * 1024) {
      alert(`الملف كبير بزاف. الحد الأقصى ${slot.maxSizeMB} MB`);
      return;
    }
    onSave(slot.id, file);
  };

  const isVideo = current?.type?.startsWith("video/");
  const isImage = current?.type?.startsWith("image/");

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand-600">
              {slot.type === "video" ? <Video className="h-3.5 w-3.5" /> : <ImageIcon className="h-3.5 w-3.5" />}
            </span>
            <h4 className="text-sm font-extrabold text-ink-900">{slot.label}</h4>
          </div>
          <p className="mt-1 text-xs text-ink-500">{slot.description}</p>
        </div>
        {current && (
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
            <Check className="h-3 w-3" />
            مرفوع
          </span>
        )}
      </div>

      <div className="mt-3">
        {current ? (
          <div className="overflow-hidden rounded-xl border border-ink-100 bg-ink-50/40">
            <div className="relative aspect-video w-full">
              {isImage && (
                <img
                  src={current.url}
                  alt={slot.label}
                  className="h-full w-full object-contain"
                />
              )}
              {isVideo && (
                <video
                  src={current.url}
                  className="h-full w-full object-contain"
                  controls
                  playsInline
                />
              )}
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-ink-100 bg-white p-2">
              <span className="truncate text-[10px] text-ink-500">
                {current.type} · {formatSize(current.size)}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="rounded-full bg-ink-100 px-2.5 py-1 text-[10px] font-bold text-ink-700 transition-colors hover:bg-ink-200"
                >
                  بدّل
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(slot.id)}
                  className="grid h-7 w-7 place-items-center rounded-full bg-red-50 text-red-600 transition-colors hover:bg-red-100"
                  aria-label="حذف"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            onClick={() => inputRef.current?.click()}
            className={`flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed transition-all ${
              dragOver
                ? "border-brand-500 bg-brand-50"
                : "border-ink-200 bg-ink-50/40 hover:border-brand-300 hover:bg-brand-50/50"
            } ${saving ? "pointer-events-none opacity-60" : ""}`}
          >
            <Upload className="h-5 w-5 text-ink-400" />
            <p className="text-xs font-bold text-ink-700">
              {saving ? "كنرفعو..." : "اضغط ولا اسحب الملف هنا"}
            </p>
            <p className="text-[10px] text-ink-500">
              {slot.type === "video" ? "فيديو" : "صورة"} · حتى {slot.maxSizeMB} MB
            </p>
          </div>
        )}

        {error && (
          <p className="mt-2 text-xs text-red-600">{error}</p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={slot.accept}
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default function MediaManager({ open, onClose }) {
  const { save, remove, loaded, media } = useMediaActions();
  const [savingSlots, setSavingSlots] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSave = async (slot, file) => {
    setSavingSlots((s) => ({ ...s, [slot]: true }));
    setErrors((e) => ({ ...e, [slot]: null }));
    try {
      await save(slot, file);
    } catch (err) {
      setErrors((e) => ({ ...e, [slot]: err.message || "وقع خطأ" }));
    } finally {
      setSavingSlots((s) => ({ ...s, [slot]: false }));
    }
  };

  const handleRemove = async (slot) => {
    if (!confirm("حذف هاد الملف؟")) return;
    try {
      await remove(slot);
    } catch (err) {
      setErrors((e) => ({ ...e, [slot]: err.message || "وقع خطأ" }));
    }
  };

  const uploadedCount = mediaSlots.filter((s) => media[s.id]).length;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-2 backdrop-blur-sm sm:items-start sm:justify-end sm:p-4 sm:pt-20"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-ink-200 bg-white shadow-2xl sm:h-auto sm:max-h-[85vh] sm:rounded-2xl"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-ink-100 p-4">
              <div>
                <h3 className="text-lg font-extrabold text-ink-900">
                  إدارة الصور والفيديو
                </h3>
                <p className="text-xs text-ink-500">
                  {uploadedCount} / {mediaSlots.length} مرفوع · الصور والفيديو كيتسجلو فـ المتصفح ديالك
                </p>
              </div>
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full text-ink-500 hover:bg-ink-50"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {!loaded ? (
                <div className="grid place-items-center py-20 text-sm text-ink-500">
                  كنحمّلو...
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {mediaSlots.map((slot) => (
                    <MediaSlot
                      key={slot.id}
                      slot={slot}
                      current={media[slot.id]}
                      onSave={handleSave}
                      onRemove={handleRemove}
                      saving={savingSlots[slot.id]}
                      error={errors[slot.id]}
                    />
                  ))}
                </div>
              )}

              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                💡 <strong>نصيحة:</strong> استعمل صور بمقاس 1:1 (مربع) باش يبانو مزيان فالمعرض. الفيديو خاصو يكون قصير (10-30 ثانية).
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
