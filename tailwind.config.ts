import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], darkMode: "class", theme: { extend: { colors: { ink: "#0d0d0e", panel: "#111214", line: "#24272d" }, fontFamily: { sans: ["Inter", "Arial", "sans-serif"], mono: ["JetBrains Mono", "Consolas", "monospace"] } } }, plugins: [] } satisfies Config;
