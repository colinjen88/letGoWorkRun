"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/** 深淺色切換。掛載前不知道使用者存的主題，先畫一個不帶狀態的按鈕避免水合不一致。 */
export function ThemeToggle({ variant = "icon" }: { variant?: "icon" | "menu" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "切換為淺色模式" : "切換為深色模式";
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      className={variant === "menu" ? "mobile-theme-btn" : "theme-toggle-btn"}
      aria-label={label}
      title={label}
      aria-pressed={mounted ? isDark : undefined}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Icon size={variant === "menu" ? 15 : 16} aria-hidden="true" />
      {variant === "menu" && <span>{label}</span>}
    </button>
  );
}
