// pages/robots.txt.js
export async function getServerSideProps({ res }) {
    const robotsContent = `User-agent: *
  Allow: /
  Sitemap: https://bellpost-seo.vercel.app/sitemap_bellpost.xml`;
  
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
    res.write(robotsContent);
    res.end();
    
    return { props: {} };
  }
  
  export default function Robots() {
    return null;
  }