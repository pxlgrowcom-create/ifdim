import MapClient from "./MapClient";
import { SEO } from "@/data/seo";

export const metadata = {
  title: SEO.map.title,
  description: SEO.map.description,
  keywords: SEO.map.keywords,
  alternates: { canonical: SEO.map.canonical },
  openGraph: { title: SEO.map.title, description: SEO.map.description, url: SEO.map.canonical },
};

export default function MapPage() {
  return <MapClient />;
}
