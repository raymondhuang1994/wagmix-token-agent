import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { brand, type Locale } from "@/data/home";
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@/styles/globals.css";

function asLocale(value: string): Locale {
  if (value === "zh" || value === "en") return value;
  notFound();
}

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  return {
    title: locale === "zh" ? "WAGMIx｜機構級代幣化平台" : "WAGMIx | Institutional Tokenization",
    description: brand.introduction[locale].join(" "),
    alternates: {
      canonical: `/${locale}`,
      languages: { "zh-Hant": "/zh", en: "/en" },
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale);
  return <html lang={locale === "zh" ? "zh-Hant" : "en"}><body>{children}</body></html>;
}
