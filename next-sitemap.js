import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      // your Firebase service account credentials here
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

export async function GET() {
  // Add static pages
  const staticUrls = ['/', '/blog', '/jobses', '/admin', '/admin/dashboard'];

  // Fetch dynamic blog slugs
  const snapshot = await db.collection('blogs').get();
  const blogUrls = snapshot.docs.map(
    (doc) => `/blog/${doc.data().slug || doc.id}`
  );

  const allUrls = [...staticUrls, ...blogUrls];

  // Build XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls
      .map(
        (url) => `<url>
      <loc>https://www.browncode.name.ng${url}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>`
      )
      .join('')}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
