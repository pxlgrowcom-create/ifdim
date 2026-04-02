import RepairClient from "./RepairClient";
import { SEO } from "@/data/seo";

export const metadata = {
  title: SEO.repair.title,
  description: SEO.repair.description,
  keywords: SEO.repair.keywords,
  alternates: { canonical: SEO.repair.canonical },
  openGraph: { title: SEO.repair.title, description: SEO.repair.description, url: SEO.repair.canonical },
};

export default function RepairPage() {
  return <RepairClient />;
}
