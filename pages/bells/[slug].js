import Head from "next/head";
import Link from "next/link";
import { bells } from "../../data/bells";
import { slugify } from "../../lib/slugify";

// Generate static paths at build time
export async function getStaticPaths() {
  const paths = bells.map((bell) => ({
    params: { slug: slugify(bell.title) },
  }));

  return {
    paths,
    fallback: false,
  };
}

// Fetch data at build time
export async function getStaticProps({ params }) {
  const bell = bells.find((b) => slugify(b.title) === params.slug);
  
  if (!bell) {
    return {
      notFound: true,
    };
  }

  // Get related bells (exclude current)
  const relatedBells = bells
    .filter(b => b.id !== bell.id)
    .slice(0, 8);

  return {
    props: {
      bell,
      relatedBells,
    },
  };
}

export default function BellPage({ bell, relatedBells }) {
  const fullUrl = `https://bellpost-seo.vercel.app/bells/${slugify(bell.title)}`;

  const jsonLdImage = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: bell.title,
    description: bell.description,
    contentUrl: bell.imageUrl,
    thumbnail: {
      "@type": "ImageObject",
      url: bell.imageUrl
    },
    url: fullUrl,
    width: "1200",
    height: "1600",
    inLanguage: "en"
  };

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: bell.title,
    description: bell.description,
    image: {
      "@type": "ImageObject",
      url: bell.imageUrl,
      width: 1200,
      height: 1600
    },
    author: {
      "@type": "Organization",
      name: "Bellpost Design Studio"
    },
    publisher: {
      "@type": "Organization",
      name: "Bellpost",
      logo: {
        "@type": "ImageObject",
        url: "https://bellpost-seo.vercel.app/logo.png"
      }
    },
    datePublished: "2025-01-08T00:00:00+00:00",
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl
    },
    url: fullUrl,
    inLanguage: "en"
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://bellpost-seo.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": bell.title,
        "item": fullUrl
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{bell.title} | Bellpost - Interior Design Ideas</title>
        <meta name="description" content={bell.description} />
        
        {/* Open Graph */}
        <meta property="og:title" content={bell.title} />
        <meta property="og:description" content={bell.description} />
        <meta property="og:image" content={bell.imageUrl} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Bellpost" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={bell.title} />
        <meta name="twitter:description" content={bell.description} />
        <meta name="twitter:image" content={bell.imageUrl} />
        
        {/* Pinterest */}
        <meta name="pinterest:media" content={bell.imageUrl} />
        <meta name="pinterest:description" content={bell.description} />
        
        <link rel="canonical" href={fullUrl} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdImage) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
        />
      </Head>

      <div className="container">
        {/* Header */}
        <header className="header">
          <Link href="/" className="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          
          <div className="header-actions">
            <button className="icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeWidth="2"/>
              </svg>
            </button>
            <button className="icon-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="12" r="2"/>
              </svg>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="main">
          <div className="content-grid">
            {/* Left: Image */}
            <div className="image-section">
              <div className="image-container">
                <img 
                  src={bell.imageUrl} 
                  alt={bell.title}
                  className="main-image"
                />
                <button className="floating-save-btn">
                  Save
                </button>
              </div>
            </div>

            {/* Right: Details */}
            <div className="details-section">
              <div className="breadcrumb">
                <Link href="/">Home</Link>
                <span className="separator">/</span>
                <span className="current">Design Ideas</span>
              </div>

              <h1 className="title">{bell.title}</h1>
              
              <div className="author-section">
                <img 
                  src="https://ui-avatars.com/api/?name=Design+Studio&background=E60023&color=fff&size=48" 
                  alt="Author"
                  className="author-avatar"
                />
                <div>
                  <div className="author-name">Bellpost Design Studio</div>
                  <div className="followers">12.5k followers</div>
                </div>
                <button className="follow-btn">Follow</button>
              </div>

              <p className="description">{bell.description}</p>

              <div className="actions">
                <button className="action-btn primary">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Save to Board
                </button>
                <button className="action-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeWidth="2"/>
                  </svg>
                  Get Updates
                </button>
              </div>

              <div className="engagement">
                <div className="stat">
                  <span className="number">2.3k</span>
                  <span className="label">saves</span>
                </div>
                <div className="stat">
                  <span className="number">847</span>
                  <span className="label">likes</span>
                </div>
                <div className="stat">
                  <span className="number">124</span>
                  <span className="label">comments</span>
                </div>
              </div>

              <div className="comments">
                <h3>Comments</h3>
                <div className="comment-form">
                  <img 
                    src="https://ui-avatars.com/api/?name=You&background=666&color=fff&size=32" 
                    alt="Your avatar"
                    className="comment-avatar"
                  />
                  <input 
                    type="text" 
                    placeholder="Add a comment..." 
                    className="comment-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Related Pins */}
          <section className="related-section">
            <h2>More like this</h2>
            <div className="related-grid">
              {relatedBells.map((relatedBell) => (
                <Link 
                  key={relatedBell.id}
                  href={`/bells/${slugify(relatedBell.title)}`}
                  className="related-pin"
                >
                  <div className="related-image-container">
                    <img 
                      src={relatedBell.imageUrl} 
                      alt={relatedBell.title}
                      loading="lazy"
                    />
                    <div className="related-overlay">
                      <button className="related-save-btn" onClick={(e) => e.preventDefault()}>
                        Save
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          min-height: 100vh;
          background: #fff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 16px;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
        }

        .back-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          transition: background 0.2s;
          color: #111;
        }

        .back-btn:hover {
          background: #e9e9e9;
        }

        .back-btn svg {
          width: 24px;
          height: 24px;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .icon-btn {
          width: 48px;
          height: 48px;
          border: none;
          background: transparent;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          color: #5f5f5f;
        }

        .icon-btn:hover {
          background: #e9e9e9;
        }

        .icon-btn svg {
          width: 20px;
          height: 20px;
        }

        /* Main Content */
        .main {
          max-width: 1260px;
          margin: 0 auto;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 32px 16px;
          align-items: start;
        }

        /* Image Section */
        .image-section {
          position: sticky;
          top: 80px;
        }

        .image-container {
          position: relative;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .main-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .floating-save-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #E60023;
          color: #fff;
          border: none;
          padding: 12px 24px;
          border-radius: 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.1s;
        }

        .floating-save-btn:hover {
          transform: scale(1.04);
        }

        /* Details Section */
        .details-section {
          padding-top: 8px;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .breadcrumb a {
          color: #111;
          text-decoration: none;
        }

        .breadcrumb a:hover {
          text-decoration: underline;
        }

        .separator {
          color: #767676;
        }

        .current {
          color: #767676;
        }

        .title {
          font-size: 36px;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 24px;
          color: #111;
        }

        .author-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }

        .author-name {
          font-weight: 600;
          color: #111;
        }

        .followers {
          font-size: 14px;
          color: #767676;
        }

        .follow-btn {
          margin-left: auto;
          background: #e9e9e9;
          border: none;
          padding: 8px 16px;
          border-radius: 24px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .follow-btn:hover {
          background: #dadada;
        }

        .description {
          font-size: 16px;
          line-height: 1.6;
          color: #111;
          margin-bottom: 24px;
        }

        .actions {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          border-radius: 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          background: #e9e9e9;
          color: #111;
        }

        .action-btn svg {
          width: 20px;
          height: 20px;
        }

        .action-btn:hover {
          background: #dadada;
        }

        .action-btn.primary {
          background: #E60023;
          color: #fff;
        }

        .action-btn.primary:hover {
          background: #AD081B;
        }

        .engagement {
          display: flex;
          gap: 32px;
          padding: 24px 0;
          border-top: 1px solid #e9e9e9;
          border-bottom: 1px solid #e9e9e9;
          margin-bottom: 24px;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .number {
          font-size: 20px;
          font-weight: 600;
          color: #111;
        }

        .label {
          font-size: 14px;
          color: #767676;
        }

        .comments {
          margin-top: 32px;
        }

        .comments h3 {
          font-size: 20px;
          margin-bottom: 16px;
        }

        .comment-form {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .comment-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .comment-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #dadada;
          border-radius: 24px;
          font-size: 16px;
          transition: border-color 0.2s;
        }

        .comment-input:focus {
          outline: none;
          border-color: #767676;
        }

        /* Related Section */
        .related-section {
          margin-top: 64px;
          padding: 0 16px 48px;
        }

        .related-section h2 {
          font-size: 28px;
          text-align: center;
          margin-bottom: 32px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(236px, 1fr));
          gap: 16px;
        }

        .related-pin {
          display: block;
          text-decoration: none;
        }

        .related-image-container {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: #f0f0f0;
        }

        .related-image-container img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.2s;
        }

        .related-pin:hover img {
          transform: scale(1.02);
        }

        .related-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%);
          opacity: 0;
          transition: opacity 0.2s;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 12px;
        }

        .related-pin:hover .related-overlay {
          opacity: 1;
        }

        .related-save-btn {
          background: #E60023;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 24px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .image-section {
            position: static;
          }

          .title {
            font-size: 24px;
          }

          .related-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: #fff;
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}