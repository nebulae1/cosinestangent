import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: string) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL}
`;

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response('Sitemap URL not configured', { status: 500 });
  }
  const sitemapURL = new URL('sitemap-index.xml', site).href;
  return new Response(getRobotsTxt(sitemapURL));
};