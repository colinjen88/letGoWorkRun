import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SkipLink } from "@/components/SkipLink";
import { DynamicBackground } from "@/components/DynamicBackground";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://let.gowork.run"),
  title: {
    default: "前端設計工程師｜WANG 作品集",
    template: "%s｜WANG 作品集",
  },
  description:
    "WANG 的前端工程與 UI 設計作品集：前端開發、後台介面、UI/UX、RWD 與動效案例解析。",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    title: "前端設計工程師｜WANG 作品集",
    description:
      "收錄 UI/UX、RWD、動效與網站實作案例。",
  },
  twitter: {
    card: "summary_large_image",
    title: "前端設計工程師｜WANG 作品集",
    description:
      "收錄 UI/UX、RWD、動效與網站實作案例。",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafbfc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
      </head>
      <body>
        <ThemeProvider>
          <SkipLink />
          <DynamicBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
