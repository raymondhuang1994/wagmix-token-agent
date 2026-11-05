import { notFound } from "next/navigation";
import LandingPage from "@/components/LandingPage";
import type { Locale } from "@/data/home";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "zh" && locale !== "en") notFound();
  return <LandingPage locale={locale as Locale} />;
}
