// components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

const footerMenu = [
  {
    label: 'Products',
    href: null,
    children: [
      { label: 'Forex CRM',      href: 'https://altimacrm.com/forex-crm' },
      { label: 'Prop CRM',       href: 'https://altimacrm.com/prop-firm-crm' },
      { label: 'Partner Portal', href: 'https://altimacrm.com/partner-portal' },
      { label: 'Client Portal',  href: 'https://altimacrm.com/client-portal' },
    ],
  },
  {
    label: 'Integrations',
    href: 'https://altimacrm.com/integrations',
    children: [
      { label: 'Trading Platform',       href: 'https://altimacrm.com/integrations#trading-platform' },
      { label: 'Payment Provider (PSPs)', href: 'https://altimacrm.com/integrations#payment-provider' },
      { label: 'KYC & Compliance',       href: 'https://altimacrm.com/integrations#kyc' },
      { label: 'VoIP & Communication',   href: 'https://altimacrm.com/integrations#volp' },
      { label: 'Trading Tools',          href: 'https://altimacrm.com/integrations#trading-tools' },
    ],
  },
  {
    label: 'Resources',
    href: null,
    children: [
      { label: 'Blogs',           href: 'https://altimacrm.com/blogs' },
      { label: 'Become a partner',href: 'https://altimacrm.com/integrations#product-hero' },
      { label: 'About Us',        href: 'https://altimacrm.com/about' },
      { label: 'Contact Us',      href: 'https://altimacrm.com/contact-us' },
      { label: 'Cookies Policy',  href: 'https://altimacrm.com/cookies-policy' },
      { label: 'Privacy Policy',  href: 'https://altimacrm.com/privacy-policy' },
    ],
  },
];

const socialLinks = [
  { href: 'https://x.com/AltimaCrm',                                           label: 'Twitter',   icon: 'https://altimacrm.com/wp-content/themes/altimacrm/img/x-icon.svg' },
  { href: 'https://www.linkedin.com/showcase/altimacrm/',                       label: 'LinkedIn',  icon: 'https://altimacrm.com/wp-content/themes/altimacrm/img/linkedin-icon.svg' },
  { href: 'https://www.facebook.com/share/1Av78Tdx5i/?mibextid=wwXIfr',         label: 'Facebook',  icon: 'https://altimacrm.com/wp-content/themes/altimacrm/img/facebook-icon.svg' },
  { href: 'https://www.instagram.com/altimacrm?igsh=NzAxcTh0bWp0YXB5',         label: 'Instagram', icon: 'https://altimacrm.com/wp-content/themes/altimacrm/img/instagram-icon.svg' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-block">
          {/* Left info block */}
          <div className="footer-info">
            <div className="logo footer__logo">
              <Link href="https://altimacrm.com/">
                <Image
                  src="https://altimacrm.com/wp-content/w3-webp/uploads/2025/08/logo.pngw3.webp"
                  alt="AltimaCRM"
                  width={194}
                  height={34}
                  unoptimized
                />
              </Link>
            </div>

            <div className="footer-creator">
              Forex CRM for the Modern Forex Brokerage by{' '}
              <Link href="https://intivion.com/" target="_blank">
                <Image
                  src="https://altimacrm.com/wp-content/themes/altimacrm/img/intivion.svg"
                  alt="Intivion"
                  width={62}
                  height={14}
                  unoptimized
                />
              </Link>
            </div>

            <div className="footer-text format-text-p">
              <div className="footer-creator">
                <p>
                  Intivion Technologies is a trusted provider of premium technology solutions for
                  Forex brokers and financial institutions. We empower our clients with a
                  comprehensive suite of innovative products — ranging from CRM and trading platforms
                  to VoIP, IB systems, and social trading infrastructure — designed to drive
                  operational efficiency, reduce risk, and accelerate business growth.
                </p>
              </div>
              <p>
                <b>Disclaimer:</b> Intivion Technologies is a software solutions provider that does
                not offer financial advice or provide financial services.
              </p>
            </div>

            <div className="footer-contacts">
              <Link href="tel:+971501110653" className="footer-contact">
                <Image
                  src="https://altimacrm.com/wp-content/themes/altimacrm/img/phone-icon.svg"
                  alt=""
                  width={16}
                  height={17}
                  unoptimized
                />
                <span>+971 50 111 0653</span>
              </Link>
              <Link href="mailto:info@altimacrm.com" className="footer-contact">
                <Image
                  src="https://altimacrm.com/wp-content/themes/altimacrm/img/envelope-icon.svg"
                  alt=""
                  width={16}
                  height={17}
                  unoptimized
                />
                <span>info@altimacrm.com</span>
              </Link>

              <div className="social footer__social">
                {socialLinks.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    className={`social-link social-link--${s.label.toLowerCase()}`}
                    target="_blank"
                    rel="noopener"
                    aria-label={s.label}
                  >
                    <Image src={s.icon} alt="" width={16} height={17} aria-hidden unoptimized />
                  </Link>
                ))}
              </div>
            </div>

            <div className="footer-copy footer-copy--desktop-hidden">
              <p>
                <b>© 2026 AltimaCRM. All rights reserved.</b>
                <br />
                A product of{' '}
                <Link href="https://intivion.com/" target="_blank">
                  Intivion Technologies
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="footer-menu">
            <ul id="menu-footer" className="footer-menu__list">
              {footerMenu.map((menu) => (
                <li key={menu.label} className="footer-menu__item">
                  {menu.href ? (
                    <Link href={menu.href} className="footer-menu__link">
                      {menu.label}
                    </Link>
                  ) : (
                    <span className="footer-menu__link">{menu.label}</span>
                  )}
                  <ul className="footer-sub-menu">
                    {menu.children.map((child) => (
                      <li key={child.label} className="footer-sub-menu__item">
                        <Link href={child.href} className="footer-sub-menu__link">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-copy footer-copy--tablet-hidden">
            <p>
              <b>© 2026 AltimaCRM. All rights reserved.</b>
              <br />
              A product of{' '}
              <Link href="https://intivion.com/" target="_blank">
                Intivion Technologies
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="floating-div">
        <Link href="#formpt" className="btn hero__btn">
          Request a demo
        </Link>
        <Link href="https://wa.me/+971501110653" className="whatsapp">
          <Image
            src="https://altimacrm.com/wp-content/themes/altimacrm/img/whatsapp.webp"
            alt="WhatsApp"
            width={70}
            height={70}
            unoptimized
          />
        </Link>
      </div>
    </footer>
  );
}
