import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, X, Eye, EyeOff, KeyRound } from "lucide-react";
import { isAdmin, tryUnlock, unlock, lock, getAdminPassword, setAdminPassword } from "../lib/adminGate";

export function useAdminStatus() {
  const [admin, setAdmin] = useState(isAdmin());
  useEffect(() => {
    const onChange = () => setAdmin(isAdmin());
    window.addEventListener("admin-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("admin-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  return admin;
}

function PasswordModal({ open, onClose, onSuccess }) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("unlock");
  const [confirm, setConfirm] = useState("");
  const [hint, setHint] = useState("");

  useEffect(() => {
    if (!open) {
      setPassword("");
      setConfirm("");
      setError("");
      setMode("unlock");
    }
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    if (mode === "unlock") {
      if (tryUnlock(password)) {
        unlock();
        onSuccess?.();
        onClose();
      } else {
        setError("كلمة السر غالطة");
      }
    } else {
      if (password.length < 4) {
        setError("كلمة السر خاصها 4 حروف على الأقل");
        return;
      }
      if (password !== confirm) {
        setError("كلمتا السر ما متطابقينش");
        return;
      }
      setAdminPassword(password);
      setHint("تم تغيير كلمة السر بنجاح");
      setTimeout(() => {
        onClose();
      }, 800);
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
          <motion.form
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full text-ink-500 hover:bg-ink-50"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-600">
              <KeyRound className="h-6 w-6" />
            </div>
            <h3 className="mt-3 text-lg font-extrabold text-ink-900">
              {mode === "unlock" ? "دخول الإدارة" : "تغيير كلمة السر"}
            </h3>
            <p className="mt-1 text-xs text-ink-500">
              {mode === "unlock"
                ? "هاد القسم غير للأدمن. الزبائن ما كيشوفوهش."
                : "كلمة سر جديدة باش تدخل للأدمن."}
            </p>

            {mode === "unlock" && (
              <p className="mt-2 rounded-lg bg-ink-50 px-3 py-2 text-[10px] text-ink-500">
                إلا ما فكّرتيش، شوف الـ README ديال المشروع.
                <br />
                بدّل كلمة السر من زر "تغيير" من بعد الدخول.
              </p>
            )}

            <div className="mt-4 space-y-2">
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="كلمة السر"
                  autoFocus
                  dir="ltr"
                  className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 pe-10 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute left-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-ink-500 hover:bg-ink-50"
                  tabIndex={-1}
                >
                  {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>

              {mode === "change" && (
                <input
                  type={show ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    setError("");
                  }}
                  placeholder="أعد كلمة السر"
                  dir="ltr"
                  className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              )}

              {error && (
                <p className="text-xs text-red-600">{error}</p>
              )}
              {hint && (
                <p className="text-xs text-brand-600">{hint}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary mt-4 w-full"
            >
              {mode === "unlock" ? "دخول" : "حفظ"}
            </button>

            {mode === "unlock" && (
              <button
                type="button"
                onClick={() => {
                  setMode("change");
                  setError("");
                }}
                className="mt-2 w-full text-center text-xs text-ink-500 hover:text-ink-700"
              >
                تغيير كلمة السر
              </button>
            )}
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AdminGate() {
  const admin = useAdminStatus();
  const [open, setOpen] = useState(false);

  if (admin) {
    return (
      <>
        <button
          onClick={() => {
            if (confirm("قفل لوحة الأدمن؟")) lock();
          }}
          className="fixed bottom-2 right-2 z-30 grid h-9 w-9 place-items-center rounded-full bg-brand-500 text-white shadow-lg transition-all hover:bg-brand-600"
          aria-label="قفل الأدمن"
          title="الأدمن مفتوح — اضغط لقفل"
        >
          <Unlock className="h-4 w-4" />
        </button>
        <PasswordModal open={open} onClose={() => setOpen(false)} />
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-2 right-2 z-30 grid h-9 w-9 place-items-center rounded-full border border-ink-200 bg-white/80 text-ink-400 backdrop-blur-sm transition-all hover:bg-white hover:text-ink-700"
        aria-label="دخول الأدمن"
        title="دخول الأدمن"
      >
        <Lock className="h-3.5 w-3.5" />
      </button>
      <PasswordModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
