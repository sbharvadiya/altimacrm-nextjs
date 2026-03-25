// components/Section2.tsx
import Image from 'next/image';

export default function Section2() {
  return (
    <div className="section2 text-center">
      <div className="container">
        <div className="row align-items-center text-start">
          <div className="col-lg-6 section2-content">
            <h2 className="wow animate__animated animate__fadeInUp">
              Institutional Operations Are <span className="blue-text">Built</span> — Not Improvised.
            </h2>
            <p className="wow animate__animated animate__fadeInUp">
              Most startups build reactively, fixing operational gaps after volume increases.
              Institutional brokers build structure first — ensuring growth does not dilute quality.
            </p>
            <ul className="list">
              <li>Brokerage CRM architecture (not generic sales CRM)</li>
              <li>Advanced multi-tier IB engine</li>
              <li>Professional client portal</li>
              <li>Permissions and workflow enforcement</li>
              <li>Audit-ready operational visibility</li>
            </ul>
          </div>
          <div className="col-lg-6">
            <Image
              src="/images/sec-2.webp"
              alt="Institutional Operations"
              width={580}
              height={450}
              className="img-fluid wow animate__animated animate__fadeInUp"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
