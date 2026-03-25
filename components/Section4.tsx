// components/Section4.tsx
import Image from 'next/image';

export default function Section4() {
  return (
    <div className="section4 wow animate__animated animate__fadeInUp">
      <div className="container">
        <div className="row align-items-center text-start">
          <div className="col-lg-6 section4-content">
            <h2 className="wow animate__animated animate__fadeInUp">
              Institutional Infrastructure Is <span className="blue-text">Strategic</span>.
            </h2>
            <p className="wow animate__animated animate__fadeInUp">
              When you launch with structured infrastructure, you accelerate trust. Trust
              strengthens IB relationships, partner conversations, compliance readiness, and
              long-term scalability.
            </p>
            <ul className="list">
              <li>Stronger IB confidence</li>
              <li>More credible partner positioning</li>
              <li>Cleaner onboarding and fewer disputes</li>
              <li>Operational discipline as teams grow</li>
              <li>Scalable architecture without rebuilds</li>
            </ul>
          </div>
          <div className="col-lg-6">
            <Image
              src="/images/sec-4.webp"
              alt="Institutional Infrastructure"
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
