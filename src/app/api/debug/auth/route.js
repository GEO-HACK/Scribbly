// Create this file: /src/app/api/debug/auth/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Debug endpoint disabled in production' }, { status: 404 });
  }

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    nextauthUrl: process.env.NEXTAUTH_URL,
    hasGithubId: !!process.env.GITHUB_ID,
    hasGithubSecret: !!process.env.GITHUB_SECRET,
    hasGoogleId: !!process.env.GOOGLE_ID,
    hasGoogleSecret: !!process.env.GOOGLE_SECRET,
    hasNextauthSecret: !!process.env.NEXTAUTH_SECRET,
  });
}
