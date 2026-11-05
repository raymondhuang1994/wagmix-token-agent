"use client";

import { useEffect } from "react";

export default function RevealManager() {
  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (!elements.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
    document.documentElement.classList.add("has-reveal");
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("has-reveal");
    };
  }, []);
  return null;
}
