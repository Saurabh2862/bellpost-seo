import Head from "next/head";
import { useRouter } from "next/router";
import { bells } from "../../data/bells";
import { slugify } from "../../lib/slugify";

export default function BellPage() {
  const { query, isReady } = useRouter();
  if (!isReady) return null;

  const bell = bells.find(b => slugify(b.title) === query.slug);
  if (!bell) return <p>Bell not found</p>;

  const fullUrl = `https://bellpost-seo.vercel.app/bells/${slugify(bell.title)}`;

  const jsonLdImage = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: bell.title,
    description: bell.description,
    contentUrl: fullUrl,
    thumbnail: {
      "@type": "ImageObject",
      url: bell.imageUrl
    },
    url: fullUrl,
    inLanguage: "en"
  };

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: bell.title,
    description: bell.description,
    image: bell.imageUrl,
    author: {
      "@type": "Organization",
      name: "Bellpost"
    },
    publisher: {
      "@type": "Organization",
      name: "Bellpost",
      logo: {
        "@type": "ImageObject",
        url: "https://saurabh2862.github.io/Saurabh_personal_Portfolio/assets/images/my_dp.jpg" // Replace with your actual logo
      }
    },
    datePublished: "2025-06-08", // Optional: make dynamic later
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl
    },
    url: fullUrl,
    inLanguage: "en"
  };

  return (
    <>
      <Head>
        <title>{bell.title}</title>
        <meta name="description" content={bell.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdImage) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
        />
      </Head>
      <main style={{ padding: 32 }}>
        <h1>{bell.title}</h1>
        <p>{bell.description}</p>
        <img src={bell.imageUrl} alt={bell.title} style={{ maxWidth: "600px" }} />
      </main>
    </>
  );
}
