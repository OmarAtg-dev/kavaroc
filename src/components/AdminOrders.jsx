import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Trash2 } from "lucide-react";
import { product } from "../data/content";

const STORAGE_KEY = "kavaroc_orders";

export default function AdminOrders({ forceOpen, onClose }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const isControlled = forceOpen !== undefined;
  const open = isControlled ? forceOpen : internalOpen;
  const setOpen = isControlled ? onClose || (() => {}) : setInternalOpen;

  useEffect(() => {
    if (!open) return;
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setOrders(data.reverse());
    } catch {
      setOrders([]);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (isControlled) return;
    const onChange = () => {
      try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        setOrders(data.reverse());
      } catch {}
    };
    window.addEventListener("storage", onChange);
    return () => window.removeEventListener("storage", onChange);
  }, [isControlled]);

  const exportCSV = () => {
    if (orders.length === 0) return;
    const headers = [
      "Order ID",
      "Date",
      "Name",
      "Phone",
      "City",
      "Address",
      "Quantity",
      "Total",
      "Notes",
    ];
    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleString("fr-MA"),
      o.name,
      o.phone,
      o.city,
      o.address,
      o.quantity,
      o.total,
      o.notes || "",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kavaroc-orders-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    if (confirm("حذف جميع الطلبات المحلية؟")) {
      localStorage.removeItem(STORAGE_KEY);
      setOrders([]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-2 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-t-2xl border border-ink-200 bg-white shadow-2xl sm:rounded-2xl"
            >
              <div className="flex items-center justify-between border-b border-ink-100 p-4">
                <div>
                  <h3 className="text-lg font-extrabold text-ink-900">
                    الطلبات المحلية ({orders.length})
                  </h3>
                  <p className="text-xs text-ink-500">
                    الطلبات المحفوظة في المتصفح ديالك
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full text-ink-500 hover:bg-ink-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50/50 p-3">
                <button
                  onClick={exportCSV}
                  disabled={orders.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-brand-600 disabled:opacity-40"
                >
                  <Download className="h-3.5 w-3.5" />
                  تصدير CSV
                </button>
                <button
                  onClick={clearAll}
                  disabled={orders.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-bold text-red-600 transition-all hover:bg-red-50 disabled:opacity-40"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  حذف الكل
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4">
                {orders.length === 0 ? (
                  <div className="py-12 text-center">
                    <ShoppingBag className="mx-auto h-12 w-12 text-ink-300" />
                    <p className="mt-3 text-sm text-ink-500">
                      ما كاين حتى طلب حتى الآن
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {orders.map((o) => (
                      <div
                        key={o.id}
                        className="rounded-xl border border-ink-100 bg-white p-3 text-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-ink-900">
                            {o.id}
                          </span>
                          <span className="text-xs text-ink-500">
                            {new Date(o.createdAt).toLocaleString("fr-MA")}
                          </span>
                        </div>
                        <div className="mt-2 grid gap-1 text-xs text-ink-600 sm:grid-cols-2">
                          <div>
                            👤 <span className="font-semibold">{o.name}</span>
                          </div>
                          <div dir="ltr" className="text-right">
                            📞 {o.phone}
                          </div>
                          <div>📍 {o.city}</div>
                          <div className="text-right font-bold text-brand-600">
                            💰 {o.total} {product.price.currency}
                          </div>
                          <div className="sm:col-span-2">🏠 {o.address}</div>
                          {o.notes && (
                            <div className="sm:col-span-2 text-ink-500">
                              📝 {o.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
