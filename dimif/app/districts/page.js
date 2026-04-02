import DistrictsClient from "./DistrictsClient";
import { SEO } from "@/data/seo";

export const metadata = {
  title: SEO.districts.title,
  description: SEO.districts.description,
  keywords: SEO.districts.keywords,
  alternates: { canonical: SEO.districts.canonical },
  openGraph: {
    title: SEO.districts.title,
    description: SEO.districts.description,
    url: SEO.districts.canonical,
  },
};

export default function DistrictsPage() {
  return <DistrictsClient />;
}
