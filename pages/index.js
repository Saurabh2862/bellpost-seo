import Link from "next/link";
import { bells } from "../data/bells";
import { slugify } from "../lib/slugify";

export default function Home() {
  return (
    <>
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="logo-section">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="#E60023">
              <path d="M12 0C5.4 0 0 5.4 0 12c0 5.1 3.2 9.4 7.6 11.2-.1-1-.2-2.4 0-3.4.2-1 1-4.4 1-4.4s-.3-.5-.3-1.3c0-1.3.7-2.2 1.7-2.2.8 0 1.1.6 1.1 1.3 0 .8-.5 1.9-.8 3-.2.9.5 1.6 1.3 1.6 1.6 0 2.8-1.7 2.8-4 0-2.1-1.5-3.6-3.7-3.6-2.5 0-4 1.9-4 3.8 0 .8.3 1.6.7 2 .1.1.1.2.1.3-.1.3-.2.9-.2 1-.1.2-.1.2-.3.1-1.1-.5-1.8-2.1-1.8-3.4 0-2.8 2-5.3 5.8-5.3 3 0 5.4 2.2 5.4 5.1 0 3-1.9 5.5-4.5 5.5-.9 0-1.7-.5-2-.9 0 0-.4 1.7-.5 2.1-.2.8-.8 1.7-1.1 2.3.8.3 1.7.4 2.6.4 6.6 0 12-5.4 12-12C24 5.4 18.6 0 12 0z"/>
            </svg>
            <h1 className="logo-text">Bellpost</h1>
          </div>
          
          <nav className="nav">
            <button className="nav-btn active">Home</button>
            <button className="nav-btn">Explore</button>
            <button className="nav-btn">Create</button>
          </nav>

          <div className="search-container">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="search" placeholder="Search for ideas" className="search-input" />
          </div>

          <div className="header-actions">
            <button className="icon-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
            </button>
            <div className="avatar">S</div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <h2 className="hero-title">Get your next</h2>
          <div className="hero-highlight">home design idea</div>
        </section>

        {/* Pinterest Grid */}
        <main className="main-content">
          <div className="masonry-grid">
            {bells.map((bell, index) => (
              <Link key={bell.id} href={`/bells/${slugify(bell.title)}`} className="pin">
                <div className="pin-wrapper">
                  <div className="pin-image-container">
                    <img 
                      src={bell.imageUrl} 
                      alt={bell.title}
                      className="pin-image"
                      loading={index > 5 ? "lazy" : "eager"}
                    />
                    <div className="pin-overlay">
                      <button className="save-btn" onClick={(e) => e.preventDefault()}>
                        Save
                      </button>
                    </div>
                  </div>
                  <div className="pin-content">
                    <h3 className="pin-title">{bell.title}</h3>
                    <div className="pin-meta">
                      <img 
                        src={`https://ui-avatars.com/api/?name=User${bell.id}&background=E60023&color=fff&size=32`} 
                        alt="User" 
                        className="pin-avatar"
                      />
                      <span className="pin-author">Design Studio</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        /* Header Styles */
        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 4px 16px;
          background: #fff;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-right: 16px;
        }

        .logo-icon {
          width: 24px;
          height: 24px;
        }

        .logo-text {
          font-size: 20px;
          font-weight: 700;
          color: #E60023;
        }

        .nav {
          display: flex;
          gap: 4px;
        }

        .nav-btn {
          padding: 0 16px;
          height: 48px;
          border: none;
          background: transparent;
          border-radius: 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
          color: #111;
        }

        .nav-btn:hover {
          background: #e9e9e9;
        }

        .nav-btn.active {
          background: #111;
          color: #fff;
        }

        .search-container {
          flex: 1;
          max-width: 800px;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #767676;
        }

        .search-input {
          width: 100%;
          height: 48px;
          padding: 0 16px 0 48px;
          border: none;
          background: #e9e9e9;
          border-radius: 24px;
          font-size: 16px;
          transition: background-color 0.2s, box-shadow 0.2s;
        }

        .search-input:hover {
          background: #dadada;
        }

        .search-input:focus {
          outline: none;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(0, 132, 255, 0.5);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
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
          transition: background-color 0.2s;
          color: #5f5f5f;
        }

        .icon-btn:hover {
          background: #e9e9e9;
        }

        .icon-btn svg {
          width: 24px;
          height: 24px;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #E60023;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          cursor: pointer;
        }

        /* Hero Section */
        .hero {
          text-align: center;
          padding: 32px 16px 16px;
        }

        .hero-title {
          font-size: 60px;
          font-weight: 600;
          color: #111;
          margin-bottom: 0;
        }

        .hero-highlight {
          font-size: 60px;
          font-weight: 600;
          color: #E60023;
          margin-bottom: 32px;
        }

        /* Main Content */
        .main-content {
          padding: 0 8px;
          max-width: 2000px;
          margin: 0 auto;
        }

        /* Masonry Grid */
        .masonry-grid {
          columns: 6 236px;
          column-gap: 16px;
        }

        /* Pin Styles */
        .pin {
          display: inline-block;
          width: 100%;
          margin-bottom: 16px;
          text-decoration: none;
          color: inherit;
          break-inside: avoid;
        }

        .pin-wrapper {
          cursor: zoom-in;
        }

        .pin-image-container {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: #f0f0f0;
        }

        .pin-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.2s;
        }

        .pin:hover .pin-image {
          transform: scale(1.02);
        }

        .pin-overlay {
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

        .pin:hover .pin-overlay {
          opacity: 1;
        }

        .save-btn {
          background: #E60023;
          color: #fff;
          border: none;
          padding: 10px 16px;
          border-radius: 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
        }

        .save-btn:hover {
          background: #AD081B;
          transform: scale(1.04);
        }

        .pin-content {
          padding: 8px 0;
        }

        .pin-title {
          font-size: 14px;
          font-weight: 600;
          color: #111;
          margin-bottom: 4px;
          line-height: 1.4;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .pin-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pin-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }

        .pin-author {
          font-size: 14px;
          color: #767676;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .masonry-grid {
            columns: 4 236px;
          }
        }

        @media (max-width: 820px) {
          .masonry-grid {
            columns: 3 236px;
          }
          
          .nav {
            display: none;
          }

          .hero-title, .hero-highlight {
            font-size: 40px;
          }
        }

        @media (max-width: 600px) {
          .masonry-grid {
            columns: 2 236px;
            column-gap: 8px;
          }

          .search-container {
            display: none;
          }

          .header {
            padding: 4px 8px;
          }

          .hero-title, .hero-highlight {
            font-size: 32px;
          }
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pin {
          animation: fadeIn 0.5s ease-out;
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

        img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </>
  );
}