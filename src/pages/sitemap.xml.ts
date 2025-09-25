export async function GET() {
  const baseUrl = 'https://tigrexmove.co.uk';

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/faq',
    '/contact',
    '/quote',
    '/services',
    '/areas',
    '/privacy',
    '/terms',
    '/blog'
  ];

  // Service pages
  const services = [
    '/services/residential-moving',
    '/services/commercial-moving',
    '/services/packing-services',
    '/services/storage-solutions',
    '/services/international-removals',
    '/services/man-and-van',
    '/services/piano-moving',
    '/services/emergency-moving'
  ];

  // Location pages
  const locations = [
    '/areas/london',
    '/areas/manchester',
    '/areas/birmingham',
    '/areas/leeds',
    '/areas/glasgow',
    '/areas/bristol',
    '/areas/edinburgh',
    '/areas/liverpool',
    '/areas/sheffield',
    '/areas/cardiff',
    '/areas/nottingham',
    '/areas/coventry'
  ];

  // Campaign pages
  const campaigns = [
    '/campaigns/student-moves',
    '/campaigns/senior-moves',
    '/campaigns/same-day-moves',
    '/campaigns/weekend-moves'
  ];

  // Combine all pages
  const allPages = [...staticPages, ...services, ...locations, ...campaigns];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => {
  const url = `${baseUrl}${page}`;
  const priority = getPriority(page);
  const changefreq = getChangeFreq(page);
  const lastmod = new Date().toISOString().split('T')[0];

  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

function getPriority(path: string): string {
  if (path === '') return '1.0'; // Homepage
  if (path.startsWith('/services/')) return '0.9'; // Service pages
  if (path.startsWith('/areas/')) return '0.8'; // Location pages
  if (['/about', '/faq', '/contact', '/quote'].includes(path)) return '0.7'; // Important pages
  return '0.5'; // Other pages
}

function getChangeFreq(path: string): string {
  if (path === '') return 'weekly'; // Homepage
  if (path.startsWith('/blog')) return 'weekly'; // Blog
  if (path.startsWith('/services/') || path.startsWith('/areas/')) return 'monthly'; // Service/location pages
  return 'yearly'; // Static pages
}