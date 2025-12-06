import { useTheme } from "../../contexts/ThemeContext";

export default function Pagination({
  meta = {},
  page,
  onPageChange,
  maxButtons = 5,
  className = "",
}) {
  const { isDarkMode } = useTheme();

  const total = meta.total_pages ?? 1;
  const current = meta.current_page ?? page ?? 1;

  if (total <= 1) return null;

  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(total, start + maxButtons - 1);
  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  const baseButtonClasses =
    "px-2 sm:px-3 py-1 rounded border text-xs sm:text-sm transition-colors";

  const darkClasses = {
    bg: "bg-gray-800",
    text: "text-gray-300",
    hover: "hover:bg-gray-700",
    active: "bg-emerald-600 text-white border-emerald-600",
    border: "border-gray-700",
  };

  const lightClasses = {
    bg: "bg-white",
    text: "text-gray-700",
    hover: "hover:bg-gray-100",
    active: "bg-emerald-600 text-white border-emerald-600",
    border: "border-gray-200",
  };

  const theme = isDarkMode ? darkClasses : lightClasses;

  return (
    <div
      className={`flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-6 ${className}`}>
      <button
        className={`hidden sm:inline ${baseButtonClasses} ${theme.bg} ${theme.text} ${theme.border} disabled:opacity-40`}
        disabled={current === 1}
        onClick={() => onPageChange(1)}
        aria-label="first">
        {"<<"}
      </button>

      <button
        className={`${baseButtonClasses} ${theme.bg} ${theme.text} ${theme.border} disabled:opacity-40`}
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}>
        Prev
      </button>

      {start > 1 && (
        <span
          className={`hidden sm:inline px-2 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}>
          ...
        </span>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`${baseButtonClasses} ${
            p === current
              ? theme.active
              : `${theme.bg} ${theme.text} ${
                  theme.border
                } ${theme.hover.replace("hover:", "")}`
          }`}>
          {p}
        </button>
      ))}

      {end < total && (
        <span className="hidden sm:inline px-2 text-gray-500">...</span>
      )}

      <button
        className={`${baseButtonClasses} ${theme.bg} ${theme.text} ${theme.border} disabled:opacity-40`}
        disabled={current === total}
        onClick={() => onPageChange(current + 1)}>
        Next
      </button>

      <button
        className={`hidden sm:inline ${baseButtonClasses} ${theme.bg} ${theme.text} ${theme.border} disabled:opacity-40`}
        disabled={current === total}
        onClick={() => onPageChange(total)}
        aria-label="last">
        {">>"}
      </button>
    </div>
  );
}
