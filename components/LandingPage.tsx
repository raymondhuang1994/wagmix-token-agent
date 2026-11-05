import type { ReactNode } from "react";
import Link from "next/link";
import RevealManager from "./RevealManager";
import {
  brand,
  byLocale,
  capabilities,
  contacts,
  homeCopy,
  legacyPath,
  localePath,
  products,
  type Locale,
} from "@/data/home";

function Arrow({ diagonal = true }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="link-arrow">{diagonal ? "↗" : "→"}</span>;
}

function BrandMark({ className = "" }: { className?: string }) {
  return <img className={className} src="/assets/wagmix-light.svg" alt="WAGMIx" width="170" height="41" />;
}

function MainNavigation({ locale }: { locale: Locale }) {
  const c = homeCopy.nav;
  return <>
    <a href="#top">{byLocale(c.about, locale)}</a>
    <details className="product-menu">
      <summary>{byLocale(c.products, locale)} <span aria-hidden="true">⌄</span></summary>
      <div className="product-menu-panel">
        <a href="#products">{byLocale(homeCopy.products.all, locale)} <Arrow /></a>
        {products.map((product) => <a key={product.code} href={legacyPath(locale, product.hash)}>
          <span>{product.code}</span><small>{product.name}</small><Arrow />
        </a>)}
      </div>
    </details>
    <a href="#ecosystem">{byLocale(c.ecosystem, locale)}</a>
    <a href="#contact">{byLocale(c.contact, locale)}</a>
  </>;
}

function Header({ locale }: { locale: Locale }) {
  const other: Locale = locale === "zh" ? "en" : "zh";
  return <header className="site-header">
    <div className="site-wrap header-inner flex items-center justify-between gap-6">
      <Link className="logo-link" href={localePath(locale)} aria-label={`WAGMIx ${byLocale(homeCopy.nav.about, locale)}`}>
        <BrandMark className="header-logo" />
      </Link>
      <nav className="desktop-nav" aria-label={byLocale(homeCopy.nav.menu, locale)}><MainNavigation locale={locale} /></nav>
      <div className="header-actions flex items-center gap-3">
        <Link className="language-link" href={localePath(other)} lang={other === "zh" ? "zh-Hant" : "en"}>
          {locale === "zh" ? "EN" : "繁中"}
        </Link>
        <a className="header-contact" href={contacts.email}>{byLocale(homeCopy.nav.contact, locale)} <Arrow /></a>
        <details className="mobile-menu">
          <summary aria-label={byLocale(homeCopy.nav.menu, locale)}><span /><span /></summary>
          <nav aria-label={byLocale(homeCopy.nav.menu, locale)}><MainNavigation locale={locale} /></nav>
        </details>
      </div>
    </div>
  </header>;
}

function HeroX() {
  return <div className="hero-visual" aria-hidden="true">
    <div className="hero-orbit hero-orbit-one" />
    <div className="hero-orbit hero-orbit-two" />
    <div className="hero-visual-glow" />
    <svg className="hero-x" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="x-field" x1="76" y1="80" x2="510" y2="532" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9cebf4" />
          <stop offset="0.23" stopColor="#3777de" />
          <stop offset="0.58" stopColor="#17407d" />
          <stop offset="0.78" stopColor="#3496b8" />
          <stop offset="1" stopColor="#9deafa" />
        </linearGradient>
        <linearGradient id="x-edge" x1="114" y1="67" x2="478" y2="545" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b3f6ff" stopOpacity=".76" />
          <stop offset=".5" stopColor="#4185ee" stopOpacity=".24" />
          <stop offset="1" stopColor="#b3f6ff" stopOpacity=".7" />
        </linearGradient>
        <mask id="x-cutout">
          <rect width="600" height="600" fill="white" />
          <path d="M300 240L360 300L300 360L240 300L300 240Z" fill="black" />
        </mask>
      </defs>
      <g mask="url(#x-cutout)">
        <path d="M111 58H236L489 542H364L111 58Z" fill="url(#x-field)" />
        <path d="M364 58H489L236 542H111L364 58Z" fill="url(#x-field)" />
        <path d="M111 58H236L489 542H364L111 58Z" stroke="url(#x-edge)" strokeWidth="2" />
        <path d="M364 58H489L236 542H111L364 58Z" stroke="url(#x-edge)" strokeWidth="2" />
      </g>
      <path d="M90 298H227M373 298H513" stroke="#8ce7f4" strokeOpacity=".34" strokeWidth="1" />
      <circle cx="90" cy="298" r="3" fill="#8ce7f4" />
      <circle cx="513" cy="298" r="3" fill="#8ce7f4" />
    </svg>
  </div>;
}

function SectionHeading({ label, title, intro, children }: { label: string; title: string; intro?: string; children?: ReactNode }) {
  return <div className="section-heading grid gap-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(230px,.6fr)] lg:items-end" data-reveal>
    <div><p className="section-label">{label}</p><h2>{title}</h2></div>
    <div className="section-heading-aside">{intro && <p>{intro}</p>}{children}</div>
  </div>;
}

function Hero({ locale }: { locale: Locale }) {
  return <section className="hero" id="top">
    <div className="site-wrap hero-grid grid lg:grid-cols-[minmax(0,1fr)_minmax(0,.92fr)] lg:items-center">
      <div className="hero-copy">
        <h1 lang={locale === "zh" ? "zh-Hant" : "en"}>{locale === "zh" ? <><span className="hero-zh-line-one">引領鏈上</span><span className="hero-zh-line-two">新浪潮</span></> : byLocale(brand.slogan, locale)}</h1>
        <div className="hero-description">
          {byLocale(brand.introduction, locale).map((line) => <p key={line}>{line}</p>)}
        </div>
        <div className="hero-actions flex flex-wrap gap-3">
          <a className="button button-primary" href="#capabilities">{byLocale(homeCopy.hero.capabilities, locale)} <Arrow diagonal={false} /></a>
          <a className="button button-secondary" href="#products">{byLocale(homeCopy.hero.products, locale)} <Arrow diagonal={false} /></a>
        </div>
      </div>
      <HeroX />
    </div>
  </section>;
}

function Capabilities({ locale }: { locale: Locale }) {
  const c = homeCopy.capabilities;
  return <section className="section capabilities-section" id="capabilities">
    <div className="site-wrap">
      <SectionHeading label={byLocale(c.label, locale)} title={byLocale(c.title, locale)} intro={byLocale(c.intro, locale)} />
      <div className="capability-list">
        {capabilities.map((capability) => <article className="capability-row" key={capability.id}>
          <div className="capability-symbol" aria-hidden="true"><span /></div>
          <div className="capability-content">
            <p className="capability-name">{byLocale(capability.title, locale)}</p>
            <h3>{byLocale(capability.headline, locale)}</h3>
          </div>
          <ul className="capability-points">
            {byLocale(capability.copy, locale).map((point) => <li key={point}>{point}</li>)}
          </ul>
        </article>)}
      </div>
      <p className="capability-note">{byLocale(c.note, locale)}</p>
    </div>
  </section>;
}

function Products({ locale }: { locale: Locale }) {
  const c = homeCopy.products;
  return <section className="section products-section" id="products">
    <div className="site-wrap">
      <SectionHeading label={byLocale(c.label, locale)} title={byLocale(c.title, locale)}>
        <a className="text-link" href={legacyPath(locale, "#/products")}>{byLocale(c.all, locale)} <Arrow /></a>
      </SectionHeading>
      <div className="product-grid grid gap-4 lg:grid-cols-2">
        {products.map((product) => <a className={`product-tile product-tile-${product.tone}`} href={legacyPath(locale, product.hash)} key={product.code} data-reveal>
          <div className="product-tile-top"><span className="status-dot" />{byLocale(c.comingSoon, locale)}</div>
          <div className="product-mark"><img src={product.logo} alt="" width="128" height="128" /></div>
          <div className="product-tile-bottom">
            <h3>{product.code}</h3>
            <p className="product-name">{product.name}</p>
            <div className="product-network">{byLocale(product.network, locale)}</div>
            <span className="product-view">{byLocale(c.view, locale)} <Arrow /></span>
          </div>
        </a>)}
      </div>
    </div>
  </section>;
}

function Team({ locale }: { locale: Locale }) {
  const c = homeCopy.team;
  return <section className="section team-section" id="team">
    <div className="site-wrap">
      <SectionHeading label={byLocale(c.label, locale)} title={byLocale(c.title, locale)} intro={byLocale(c.intro, locale)} />
      <div className="team-grid grid gap-12 lg:grid-cols-[.9fr_1.1fr]" data-reveal>
        <div className="team-stat"><p>{byLocale(c.average, locale)}</p><div><strong>16</strong><span>{byLocale(c.years, locale)}</span></div><p>{byLocale(c.caption, locale)}</p></div>
        <div className="team-disciplines grid gap-10 sm:grid-cols-2">
          <div><h3>{byLocale(c.technical, locale)}</h3><ul>{byLocale(c.technicalItems, locale).map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>{byLocale(c.markets, locale)}</h3><ul>{byLocale(c.marketItems, locale).map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </div>
    </div>
  </section>;
}

function Ecosystem({ locale }: { locale: Locale }) {
  const c = homeCopy.ecosystem;
  return <section className="section ecosystem-section" id="ecosystem">
    <div className="site-wrap">
      <SectionHeading label={byLocale(c.label, locale)} title={byLocale(c.title, locale)} intro={byLocale(c.intro, locale)} />
      <div className="ecosystem-flow grid gap-4 lg:grid-cols-[1fr_1.25fr_1fr] lg:items-stretch" data-reveal>
        <div className="eco-ends"><div>{byLocale(c.leftTop, locale)}</div><div>{byLocale(c.leftBottom, locale)}</div></div>
        <div className="eco-hub"><div className="eco-hub-mark"><BrandMark /></div><h3>{byLocale(c.hub, locale)}</h3>{byLocale(c.hubLines, locale).map((line) => <p key={line}>{line}</p>)}</div>
        <div className="eco-ends"><div>{byLocale(c.rightTop, locale)}</div><div>{byLocale(c.rightBottom, locale)}</div></div>
      </div>
      <div className="ecosystem-foot flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><p>{byLocale(c.note, locale)}</p><a className="text-link" href={legacyPath(locale, "#/ecosystem")}>{byLocale(c.explore, locale)} <Arrow /></a></div>
    </div>
  </section>;
}

function Contact({ locale }: { locale: Locale }) {
  const c = homeCopy.contact;
  const channels = [
    { label: byLocale(c.email, locale), description: byLocale(c.emailDescription, locale), address: "info@wagmix.com", href: contacts.email },
    { label: "X", description: byLocale(c.xDescription, locale), address: "@WAGMIx_Official", href: contacts.x },
    { label: "Telegram", description: byLocale(c.telegramDescription, locale), address: "t.me/wagmix", href: contacts.telegram },
  ];
  return <section className="section contact-section" id="contact">
    <div className="site-wrap">
      <div className="contact-intro" data-reveal><p className="section-label">{byLocale(c.label, locale)}</p><h2>{byLocale(c.title, locale)}</h2><p>{byLocale(c.intro, locale)}</p></div>
      <div className="contact-channels grid gap-3 md:grid-cols-3">
        {channels.map((channel) => <a href={channel.href} key={channel.label} target={channel.href.startsWith("http") ? "_blank" : undefined} rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}>
          <span className="contact-channel-title">{channel.label}<Arrow /></span><span className="contact-channel-description">{channel.description}</span><strong>{channel.address}</strong>
        </a>)}
      </div>
    </div>
  </section>;
}

function Footer({ locale }: { locale: Locale }) {
  return <footer className="footer">
    <div className="site-wrap footer-top flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><Link href={localePath(locale)}><BrandMark className="footer-logo" /></Link><p>{byLocale(brand.slogan, locale)}</p></div><a href="#top" aria-label={locale === "zh" ? "回到頁首" : "Back to top"}>↑</a></div>
    <div className="site-wrap footer-bottom flex flex-col gap-3 md:flex-row md:justify-between"><span>© 2026 WAGMIx Company Limited. {byLocale(homeCopy.footer.rights, locale)}</span><span>{byLocale(homeCopy.footer.note, locale)}</span></div>
  </footer>;
}

export default function LandingPage({ locale }: { locale: Locale }) {
  return <><RevealManager /><a className="skip-link" href="#main">{locale === "zh" ? "跳至內容" : "Skip to content"}</a><Header locale={locale} /><main id="main"><Hero locale={locale} /><Capabilities locale={locale} /><Products locale={locale} /><Team locale={locale} /><Ecosystem locale={locale} /><Contact locale={locale} /></main><Footer locale={locale} /></>;
}
