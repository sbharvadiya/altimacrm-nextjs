// components/Header.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="container">
        <Link href="https://altimacrm.com/">
          <Image
            src="/images/logo.webp"
            alt="AltimaCRM"
            width={194}
            height={34}
            className="img-fluid logo wow animate__animated animate__fadeInUp"
          />
        </Link>
      </div>
    </header>
  );
}
