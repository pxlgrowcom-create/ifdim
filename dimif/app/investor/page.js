import InvestorClient from "./InvestorClient";
import { SEO } from "@/data/seo";

export const metadata = {
  title: SEO.investor.title,
  description: SEO.investor.description,
  keywords: SEO.investor.keywords,
  alternates: { canonical: SEO.investor.canonical },
  openGraph: { title: SEO.investor.title, description: SEO.investor.description, url: SEO.investor.canonical },
};

export default function InvestorPage() {
  return <InvestorClient />;
}
