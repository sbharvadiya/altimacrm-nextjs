// app/thank-you/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';

function ThankYouContent() {
  const params = useSearchParams();
  const success = params.get('success') === '1';

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        padding: '40px 20px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        {success ? (
          <>
            <Image
              src="/images/Thanks.webp"
              alt="Thank you"
              width={200}
              height={160}
              className="img-fluid"
              style={{ marginBottom: 24 }}
            />
            <h2 style={{ color: '#2F394B', marginBottom: 12 }}>Thank You!</h2>
            <p>Your message has been successfully submitted.</p>
            <p>We&apos;ll get back to you shortly.</p>
          </>
        ) : (
          <>
            <h2 style={{ color: '#2F394B', marginBottom: 12 }}>Something went wrong</h2>
            <p>We couldn&apos;t process your request. Please try again.</p>
          </>
        )}
        <Link
          href="/"
          className="common-btn"
          style={{ marginTop: 24, display: 'inline-block' }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
