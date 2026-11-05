import siteConfig from "./v17/site-config.json";
import contentMap from "./v17/content-map.json";

export type Locale = "zh" | "en";

type Localized<T> = { zh: T; en: T };

export const localePath = (locale: Locale) => `/${locale}`;
export const legacyPath = (locale: Locale, hash = "") =>
  `/legacy/${locale === "zh" ? "WAGMIx_繁體中文_V17.html" : "WAGMIx_English_V17.html"}${hash}`;

export function byLocale<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

export const brand = siteConfig.brand;
export const contacts = siteConfig.contacts;

const capabilityHeadlines: Record<string, Localized<string>> = {
  platform: {
    zh: "平台支持全天候二級交易，SKHY2Lw 支持 T0 申贖交收¹。",
    en: "The platform supports 24/7 secondary trading; SKHY2Lw supports T0¹ primary settlement.",
  },
  custody: {
    zh: "透過持牌券商託管資產，配合鏈上鏈下持倉核對。",
    en: "Licensed broker custody supports on- and off-chain reconciliation.",
  },
  liquidity: {
    zh: "整合做市與報價服務，支持全天候訂單簿交易。",
    en: "Market making and quotes support round-the-clock order-book trading.",
  },
  structuring: {
    zh: "連接資產與代幣權益，串聯發行與申贖流程。",
    en: "RWA structuring links assets and token rights with issuance and redemption.",
  },
  research: {
    zh: "以投研釐清標的價值，解析產品機制與邏輯。",
    en: "Research connects the asset thesis with the product mechanics.",
  },
};

export const capabilities = siteConfig.capabilityOrder.map((id) => {
  const source = contentMap.capabilities.find((item) => item.id === id);
  if (!source || !capabilityHeadlines[id]) {
    throw new Error(`Missing V17 capability: ${id}`);
  }
  return { ...source, headline: capabilityHeadlines[id] };
});

export const homeCopy = {
  nav: {
    about: { zh: "關於 WAGMIx", en: "About WAGMIx" },
    products: { zh: "產品", en: "Products" },
    ecosystem: { zh: "生態", en: "Ecosystem" },
    contact: { zh: "聯絡我們", en: "Contact us" },
    menu: { zh: "網站選單", en: "Site menu" },
  },
  hero: {
    capabilities: { zh: "探索五項能力", en: "Explore our capabilities" },
    products: { zh: "探索產品", en: "Explore products" },
  },
  capabilities: {
    label: { zh: "五項核心能力", en: "Built around five capabilities" },
    title: { zh: "五項核心能力，貫穿研究、發行與交易。", en: "Five capabilities connect research, issuance and trading." },
    intro: {
      zh: "WAGMIx 整合金融專業與運營能力，讓不同環節在清晰的分工下協作。",
      en: "WAGMIx brings financial expertise and operating capabilities together, with clear responsibilities across the product lifecycle.",
    },
    note: {
      zh: "¹ SKHY2Lw：一級申贖由獲批參與交易商為合資格專業投資者辦理。港股交易時段內外均可進行 T0 交收；如無法可靠估值或交收，交收將順延。港股非交易時段的價格僅供參考。其他產品的申贖及交收安排，以各自最終產品文件為準。",
      en: "¹ SKHY2Lw: Primary subscriptions and redemptions are processed through approved participating dealers (PDs) for eligible professional investors. T0 settlement is available both during and outside of Hong Kong market hours. Settlement is deferred when reliable valuation or settlement is unavailable. Reference prices outside Hong Kong market hours are indicative. Other products’ subscription, redemption and settlement arrangements are governed by their respective final product documents.",
    },
  },
  products: {
    label: { zh: "代幣化股票／ETF", en: "Tokenized Stocks / ETFs" },
    title: { zh: "7709 代幣化產品", en: "7709 tokenized products" },
    all: { zh: "查看全部產品", en: "View all products" },
    view: { zh: "查看產品", en: "View product" },
    comingSoon: { zh: "即將上線", en: "Coming soon" },
  },
  team: {
    label: { zh: "團隊與專業能力", en: "Team & expertise" },
    title: {
      zh: "團隊平均擁有 16 年專業經驗，結合技術與資本市場專長。",
      en: "Our team averages 16 years of experience across technology and capital markets.",
    },
    intro: {
      zh: "團隊專長涵蓋軟體工程、金融科技與機構交易，結合技術實作與資本市場經驗。",
      en: "The team brings together software engineering, financial technology and institutional trading experience.",
    },
    average: { zh: "平均專業經驗", en: "Average professional experience" },
    years: { zh: "年", en: "years" },
    caption: { zh: "技術與資本市場的跨領域經驗", en: "Experience across technology and capital markets" },
    technical: { zh: "技術專長", en: "Technical expertise" },
    technicalItems: {
      zh: ["雲端原生架構", "低延遲系統", "企業級系統", "微服務架構"],
      en: ["Cloud-native architecture", "Low-latency systems", "Enterprise systems", "Microservices"],
    },
    markets: { zh: "資本市場經驗", en: "Capital markets" },
    marketItems: {
      zh: ["智能合約", "ETF 與固定收益", "風險管理", "機構顧問服務"],
      en: ["Smart contracts", "ETFs & fixed income", "Risk management", "Institutional advisory"],
    },
  },
  ecosystem: {
    label: { zh: "WAGMIx 生態協作", en: "Connected through WAGMIx" },
    title: {
      zh: "WAGMIx 協調各方分工，讓產品運營有序銜接。",
      en: "WAGMIx coordinates participants through a consistent operating model.",
    },
    intro: {
      zh: "從指令接收、代幣化及紀錄管理，到託管、交割與市場接入，每個角色都有清晰職責。",
      en: "From instructions, tokenization and recordkeeping to custody, settlement and market access, each participant has a defined role.",
    },
    leftTop: { zh: "底層資產管理人", en: "Underlying Product Asset Manager" },
    leftBottom: { zh: "持牌券商託管", en: "Licensed broker custody" },
    hub: { zh: "代幣化與運營協調", en: "Tokenization & coordination" },
    hubLines: {
      zh: ["流程治理 · 跨機構協作", "計算與登記 · 持倉核對"],
      en: ["Process governance · Counterparty coordination", "Calculation & registry · Reconciliation"],
    },
    rightTop: { zh: "支持的公鏈與交易平台", en: "Supported networks & venues" },
    rightBottom: { zh: "合資格市場參與者", en: "Eligible market participants" },
    note: {
      zh: "具體參與角色、可用平台及交易限制，以適用產品文件為準。",
      en: "Participant roles, available venues and restrictions are defined in the applicable product documents.",
    },
    explore: { zh: "了解 WAGMIx 生態協作", en: "Explore the WAGMIx ecosystem" },
  },
  contact: {
    label: { zh: "聯絡我們", en: "Contact us" },
    title: { zh: "讓您的產品，連接更廣闊的市場。", en: "Bring your product to connected markets." },
    intro: {
      zh: "從產品架構、發行協調到交易與日常運營，與我們探討適合您的代幣化方案。",
      en: "From product structuring and issuance coordination to trading and daily operations, discuss your tokenization plans with our team.",
    },
    email: { zh: "電子郵件", en: "Email" },
    emailDescription: { zh: "商務合作與機構諮詢", en: "Business and institutional enquiries" },
    xDescription: { zh: "品牌與產品動態", en: "Brand and product updates" },
    telegramDescription: { zh: "社群與公告", en: "Community and announcements" },
  },
  footer: {
    rights: { zh: "保留所有權利。", en: "All rights reserved." },
    note: { zh: "產品條款以最終交易文件為準。", en: "Definitive transaction documents govern product terms." },
  },
} satisfies Record<string, Record<string, Localized<string | string[]>>>;

export const products = [
  {
    code: "7709.W",
    name: "WAGMIx SK Hynix Daily Max (2x) Token",
    logo: "/assets/7709.W.svg",
    network: { zh: "BNB Smart Chain（擬部署）", en: "BNB Smart Chain (planned)" },
    hash: "#/products/7709/7709.W/overview",
    tone: "indigo",
  },
  {
    code: "SKHY2Lw",
    name: "WAGMIx SK Hynix Daily Max (2x)",
    logo: "/assets/SKHY2Lw.svg",
    network: { zh: "Solana 鏈上交易", en: "Solana on-chain trading" },
    hash: "#/products/7709/SKHY2Lw/overview",
    tone: "cyan",
  },
] as const;
