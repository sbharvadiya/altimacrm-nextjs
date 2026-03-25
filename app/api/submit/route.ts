// app/api/submit/route.ts
// Form submission API route — mirrors the original /api/submit endpoint

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract turnstile token for server-side verification
    const turnstileToken = formData.get('turnstile_token') as string;

    // Verify Cloudflare Turnstile token
    if (turnstileToken) {
      const secretKey = process.env.TURNSTILE_SECRET_KEY || '';
      if (secretKey) {
        const verifyRes = await fetch(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              secret: secretKey,
              response: turnstileToken,
            }),
          }
        );
        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
          return NextResponse.json(
            { success: false, error: 'Security verification failed.' },
            { status: 400 }
          );
        }
      }
    }

    // Convert FormData to plain object for downstream use
    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        payload[key] = value;
      }
    });

    // TODO: Forward to your CRM / webhook endpoint
    // Example:
    // await fetch(process.env.CRM_WEBHOOK_URL!, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // });

    console.log('Form submission received:', JSON.stringify(payload, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
