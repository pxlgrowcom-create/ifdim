import './globals.css';
import { SCHEMA_ORG, FAQ_SCHEMA } from '@/data/seo';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Купити квартиру Івано-Франківськ 2025 | Новобудови, ціни, райони — IFdim",
  description: "Купити квартиру в Івано-Франківську: порівняння 10 районів, 38 новобудов від забудовників blago, Квартал, Ярковиця. Калькулятор єОселя, ціни від $650/м².",
  keywords: "купити квартиру івано-франківськ, новобудови івано-франківськ, єОселя івано-франківськ, райони івано-франківська",
  openGraph: {
    title: "Купити квартиру в Івано-Франківську — новобудови, ціни, райони | IFdim",
    description: "38 новобудов, 10 районів, калькулятор єОселя. Порівняй ціни від $650/м².",
    url: "https://ifdim.com",
    siteName: "IFdim — Нерухомість Івано-Франківська",
    locale: "uk_UA",
    type: "website",
  },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  alternates: { canonical: "https://ifdim.com" },
};

export default function RootLayout({ children }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_SCHEMA.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <html lang="uk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
