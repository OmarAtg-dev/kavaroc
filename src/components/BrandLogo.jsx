import { useMediaSlot } from "../context/MediaContext";
import { useState } from "react";

export function BrandLogo({
  variant = "default",
  showName = true,
  iconSize = "md",
  nameClassName = "",
  iconClassName = "",
}) {
  const logo = useMediaSlot("logo");
  const [error, setError] = useState(false);

  const isDark = variant === "dark";

  const sizeMap = {
    sm: { box: "h-9 w-9", img: "h-7 w-7" },
    md: { box: "h-11 w-11", img: "h-9 w-9" },
    lg: { box: "h-14 w-14", img: "h-12 w-12" },
    xl: { box: "h-20 w-20", img: "h-16 w-16" },
    xxl: { box: "h-28 w-28", img: "h-24 w-24" },
  };

  const s = sizeMap[iconSize] || sizeMap.md;

  if (logo && !error) {
    return (
      <div className="flex items-center gap-2.5">
        <div className={`grid ${s.box} place-items-center ${iconClassName}`}>
          <img
            src={logo.url}
            alt="Kavaroc"
            className={`${s.img} object-contain`}
            onError={() => setError(true)}
          />
        </div>
        {showName && (
          <div className="flex flex-col leading-tight">
            <span
              className={`text-sm font-extrabold sm:text-base ${
                isDark ? "text-white" : "text-ink-900"
              } ${nameClassName}`}
            >
              Kavaroc
            </span>
            <span
              className={`text-[10px] sm:text-xs ${
                isDark ? "text-white/70" : "text-ink-500"
              }`}
            >
              سدادة اسفل الباب
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`grid ${s.box} place-items-center rounded-xl bg-brand-500 text-white shadow-glow ${iconClassName}`}
      >
        <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="currentColor">
          <rect x="3" y="10" width="18" height="4" rx="1" />
          <rect x="3" y="16" width="18" height="2" rx="1" opacity="0.6" />
        </svg>
      </div>
      {showName && (
        <div className="flex flex-col leading-tight">
          <span
            className={`text-sm font-extrabold sm:text-base ${
              isDark ? "text-white" : "text-ink-900"
            } ${nameClassName}`}
          >
            Kavaroc
          </span>
          <span
            className={`text-[10px] sm:text-xs ${
              isDark ? "text-white/70" : "text-ink-500"
            }`}
          >
            سدادة اسفل الباب
          </span>
        </div>
      )}
    </div>
  );
}

export default BrandLogo;
