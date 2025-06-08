export async function getServerSideProps({ res }) {
    res.setHeader("Content-Type", "text/plain");
    res.write(`User-agent: *
  Allow: /
  Sitemap: https://bellpost-seo.vercel.app/sitemap_bellpost.xml`);
    res.end();
  
    return { props: {} };
  }
  
  export default function Robots() {
    return null;
  }
  