// components/BannerSection.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function BannerSection() {
  return (
    <div className="banner-section">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6">
            <h1 className="wow animate__animated animate__fadeInUp">
              Operate Like an{' '}
              <span className="blue-text">Institutional Broker</span>{' '}
              — Even If You&apos;re Just Launching
            </h1>
            <p className="wow animate__animated animate__fadeInUp">
              AltimaCRM provides startup Forex &amp; CFD brokers with enterprise-grade
              operational infrastructure from day one. In Forex and CFD markets, perception
              shapes reality. IBs, liquidity partners, and sophisticated clients evaluate you
              based on operational maturity — not marketing claims. Institutional infrastructure
              signals credibility.
            </p>
            <div className="pt-4">
              <Link
                href="#formpt"
                className="common-btn border-btn wow animate__animated animate__fadeInUp"
              >
                Request A Demo
              </Link>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <Image
              src="/images/Banner.webp"
              alt="AltimaCRM Banner"
              width={600}
              height={480}
              className="img-fluid wow animate__animated animate__fadeInUp"
            />
          </div>
        </div>
      </div>
      <Image
        src="/images/banner-bottom.webp"
        alt=""
        width={1440}
        height={60}
        className="banner-img"
      />
    </div>
  );
}
