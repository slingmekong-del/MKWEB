// Site-wide + per-page editable content, sourced from committed JSON files under
// content/ so the Decap CMS ("Cài đặt → Site" and the "Trang" collection) can edit
// every headline, list and contact detail without a code change. These are
// singletons imported directly (same pattern as content/categories.json in
// products.ts) — no build step, unlike the many-file products bundle.
import siteData from "../../content/settings/site.json";
import homeData from "../../content/pages/home.json";
import aboutData from "../../content/pages/about.json";
import servicesData from "../../content/pages/services.json";
import projectsData from "../../content/pages/projects.json";
import contactData from "../../content/pages/contact.json";

export type NavLink = { href: string; label: string };

export type SiteSettings = {
  company: {
    name: string;
    brandName: string;
    brandTagline: string;
    blurb: string;
    phone: string;
    phoneHref: string;
    fax: string;
    email: string;
    addressLines: string[];
    addressInline: string;
    mapQuery: string;
  };
  nav: NavLink[];
  headerCtas: { wllLabel: string; quoteLabel: string };
  footer: {
    productLinks: NavLink[];
    serviceLinks: NavLink[];
    companyLinks: NavLink[];
    bottomBar: string[];
    copyrightName: string;
  };
};

export type HomeContent = {
  hero: {
    eyebrow: string;
    headlineTop: string;
    headlineBottom: string;
    subhead: string;
    ctaPrimary: NavLink;
    ctaSecondary: NavLink;
    features: { icon: string; text: string }[];
  };
  stats: { value: string; label: string }[];
  aboutTeaser: {
    eyebrow: string;
    heading: string;
    body: string;
    link: NavLink;
    credentials: { code: string; desc: string }[];
  };
  productsTeaser: {
    eyebrow: string;
    heading: string;
    highlights: { id: string; desc: string }[];
    brands: string[];
  };
  servicesTeaser: {
    eyebrow: string;
    heading: string;
    subhead: string;
    services: { id: string; iconKey: string; title: string; desc: string; tags: string[] }[];
    ctaLabel: string;
  };
};

export type Meta = { title: string; description: string };

export type AboutContent = {
  meta: Meta;
  hero: { eyebrow: string; headline: string; subhead: string };
  missionVision: { mission: string; vision: string };
  story: { eyebrow: string; heading: string; paragraphs: string[] };
  credentials: { code: string; label: string; detail: string }[];
  values: { eyebrow: string; heading: string; items: { title: string; desc: string }[] };
  clients: { eyebrow: string; heading: string; names: string[] };
  cta: { heading: string; body: string; primary: NavLink; secondary: NavLink };
};

export type ServicesContent = {
  meta: Meta;
  hero: { eyebrow: string; headline: string; subhead: string };
  stats: { value: string; label: string }[];
  services: { id: string; icon: string; title: string; desc: string; items: string[]; tags: string[] }[];
  facility: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    equipment: { name: string; detail: string }[];
  };
  process: { eyebrow: string; heading: string; items: { step: string; title: string; desc: string }[] };
  certifications: { eyebrow: string; heading: string; items: { code: string; title: string; detail: string }[] };
  cta: { heading: string; body: string; primary: NavLink };
};

export type ProjectsContent = {
  meta: Meta;
  hero: { eyebrow: string; headline: string; subhead: string };
  stats: { value: string; label: string }[];
  sectorsSection: { eyebrow: string; heading: string };
  sectors: { id: string; icon: string; title: string; desc: string; clients: string }[];
  gallery: { eyebrow: string; heading: string; note: string };
  cta: { heading: string; body: string; primary: NavLink; secondary: NavLink };
};

export type ContactContent = {
  meta: Meta;
  hero: { eyebrow: string; headline: string; subhead: string };
  salesTeam: { name: string; role: string; phone: string; email: string; priority: boolean }[];
  rfqChecklist: { heading: string; items: string[] };
};

export const SITE = siteData as SiteSettings;
export const HOME = homeData as unknown as HomeContent;
export const ABOUT = aboutData as AboutContent;
export const SERVICES = servicesData as ServicesContent;
export const PROJECTS = projectsData as ProjectsContent;
export const CONTACT = contactData as ContactContent;
