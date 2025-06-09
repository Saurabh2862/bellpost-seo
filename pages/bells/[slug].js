import Head from "next/head";
import { useRouter } from "next/router";
import { bells } from "../../data/bells";
import { slugify } from "../../lib/slugify";

export default function BellPage() {
  const { query } = useRouter();
  const bell = bells.find(b => slugify(b.title) === query.slug);

  if (!bell) return <p>Bell not found</p>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: bell.title,
    description: bell.description,
    contentUrl: `https://example.com/bells/${slugify(bell.title)}`,
    thumbnail: {
      "@type": "ImageObject",
      url: bell.imageUrl
    },
    url: `https://example.com/bells/${slugify(bell.title)}`,
    inLanguage: "en"
  };

  return (
    <>
      <Head>
        <title>{bell.title}</title>
        <meta name="description" content={bell.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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