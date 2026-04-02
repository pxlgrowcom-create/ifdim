import { BLOG_ARTICLES } from "@/data/blog";
import ArticleClient from "./ArticleClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return BLOG_ARTICLES.map(a => ({ slug: a.id }));
}

export async function generateMetadata({ params }) {
  const article = BLOG_ARTICLES.find(a => a.id === params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | IFdim`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://ifdim.com/blog/${article.id}`,
      type: "article",
      publishedTime: article.date,
    },
    alternates: { canonical: `https://ifdim.com/blog/${article.id}` },
  };
}

export default function ArticlePage({ params }) {
  const article = BLOG_ARTICLES.find(a => a.id === params.slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.date,
    "author": { "@type": "Organization", "name": "IFdim" },
    "publisher": { "@type": "Organization", "name": "IFdim", "url": "https://ifdim.com" },
    "inLanguage": "uk-UA",
    "mainEntityOfPage": `https://ifdim.com/blog/${article.id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ArticleClient article={article} />
    </>
  );
}
