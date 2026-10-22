import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

const desktopThemeSwitch = `
                    <a href="/" aria-label="切換至亮色新版作品集" title="切換至亮色新版作品集"
                        class="legacy-theme-switch">
                        <i data-lucide="sun" class="h-4 w-4" aria-hidden="true"></i>
                    </a>`;

const legacyThemeStyles = `<style>
    .legacy-theme-switch {
        align-items: center;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(251, 191, 36, 0.28);
        border-radius: 9999px;
        color: #fbbf24;
        display: inline-flex;
        flex: 0 0 auto;
        height: 2.5rem;
        justify-content: center;
        transition: background-color .25s ease, border-color .25s ease, transform .25s ease;
        width: 2.5rem;
        animation: legacy-sun-glow 3.2s ease-in-out infinite;
    }
    .legacy-theme-switch svg {
        filter: drop-shadow(0 0 3px rgba(251, 191, 36, 0.55));
        animation: legacy-sun-icon 3.2s ease-in-out infinite;
    }
    .legacy-theme-switch:hover {
        background: rgba(251, 191, 36, 0.12);
        border-color: rgba(251, 191, 36, 0.6);
        box-shadow: 0 0 22px 2px rgba(251, 191, 36, 0.4);
        transform: scale(1.05);
        animation-play-state: paused;
    }
    .legacy-theme-switch:focus-visible {
        outline: 2px solid #fbbf24;
        outline-offset: 3px;
    }
    @keyframes legacy-sun-glow {
        0%, 100% { box-shadow: 0 0 6px 0 rgba(251, 191, 36, 0.12); }
        50% { box-shadow: 0 0 16px 2px rgba(251, 191, 36, 0.32); }
    }
    @keyframes legacy-sun-icon {
        0%, 100% { filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.4)); }
        50% { filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.85)); }
    }
    @media (prefers-reduced-motion: reduce) {
        .legacy-theme-switch,
        .legacy-theme-switch svg { animation: none; }
        .legacy-theme-switch { box-shadow: 0 0 12px 1px rgba(251, 191, 36, 0.25); }
    }
</style>`;

// Brand icons were dropped from lucide v1; keep the shapes the legacy page used.
const legacyIconBodies: Record<string, string> = {
  figma:
    '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>',
};

const lucideIconsDir = path.join(process.cwd(), "node_modules", "lucide-react", "dist", "esm", "icons");

// Reads the icon's generated `__iconNode` from lucide-react's ESM build,
// following alias modules (e.g. code-2 -> code-xml).
async function readLucideIconBody(name: string): Promise<string | null> {
  let source: string;
  try {
    source = await readFile(path.join(lucideIconsDir, `${name}.mjs`), "utf8");
  } catch {
    return null;
  }

  const alias = /export \{ default \} from '\.\/([a-z0-9-]+)\.mjs'/.exec(source);
  if (alias) return readLucideIconBody(alias[1]);

  const nodeList = /const __iconNode = \[([\s\S]*?)\];/.exec(source)?.[1];
  if (!nodeList) return null;

  return [...nodeList.matchAll(/\[\s*"(\w+)",\s*\{([^}]*)\}\s*\]/g)]
    .map(([, tag, attrs]) => {
      const attributes = [...attrs.matchAll(/(\w+): "([^"]*)"/g)]
        .filter(([, key]) => key !== "key")
        .map(([, key, value]) => `${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}="${value}"`)
        .join(" ");
      return `<${tag} ${attributes}/>`;
    })
    .join("");
}

// Replaces <i data-lucide="..."> placeholders with static SVG so the page
// no longer needs the full lucide UMD bundle at runtime.
async function inlineLucideIcons(html: string) {
  const placeholder = /<i data-lucide="([a-z0-9-]+)"([^>]*)><\/i>/g;
  const names = new Set([...html.matchAll(placeholder)].map(([, name]) => name));
  const bodies = new Map<string, string | null>();
  await Promise.all(
    [...names].map(async (name) => {
      bodies.set(name, legacyIconBodies[name] ?? (await readLucideIconBody(name)));
    }),
  );

  return html.replace(placeholder, (match, name: string, rest: string) => {
    const body = bodies.get(name);
    if (!body) {
      console.warn(`[dark.html] Unknown lucide icon "${name}" left as placeholder.`);
      return match;
    }

    const className = /class="([^"]*)"/.exec(rest)?.[1] ?? "";
    const classes = `lucide lucide-${name} ${className}`.trim();
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}" aria-hidden="true">${body}</svg>`;
  });
}

function prepareLegacyPage(source: string, loadingStyles: string) {
  const page = source
    .replace(
      '<link rel="stylesheet" href="loading/loading.css">',
      `<style>${loadingStyles}</style>`,
    )
    .replaceAll('href="assets/', 'href="/assets/')
    .replaceAll('src="assets/', 'src="/assets/')
    .replace("</head>", `${legacyThemeStyles}\n</head>`)
    .replace(
      '<div class="flex items-center gap-4">',
      `<div class="flex items-center gap-3">${desktopThemeSwitch}`,
    );

  return inlineLucideIcons(page);
}

export async function GET() {
  const workspaceRoot = process.cwd();
  const [source, loadingStyles] = await Promise.all([
    readFile(path.join(workspaceRoot, "index.html"), "utf8"),
    readFile(path.join(workspaceRoot, "loading", "loading.css"), "utf8"),
  ]);

  return new Response(await prepareLegacyPage(source, loadingStyles), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
