import EoseliaClient from "./EoseliaClient";
import { SEO } from "@/data/seo";

export const metadata = {
  title: SEO.eoselia.title,
  description: SEO.eoselia.description,
  keywords: SEO.eoselia.keywords,
  alternates: { canonical: SEO.eoselia.canonical },
  openGraph: { title: SEO.eoselia.title, description: SEO.eoselia.description, url: SEO.eoselia.canonical },
};

export default function EoseliaPage() {
  return <EoseliaClient />;
}
