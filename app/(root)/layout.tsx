import type { ReactNode } from "react";
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@/styles/globals.css";

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
