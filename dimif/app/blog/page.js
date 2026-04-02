import BlogClient from "./BlogClient";
import { SEO } from "@/data/seo";

export const metadata = {
  title: SEO.blog.title,
  description: SEO.blog.description,
  keywords: SEO.blog.keywords,
  alternates: { canonical: SEO.blog.canonical },
  openGraph: { title: SEO.blog.title, description: SEO.blog.description, url: SEO.blog.canonical },
};

export default function BlogPage() {
  return <BlogClient />;
}
