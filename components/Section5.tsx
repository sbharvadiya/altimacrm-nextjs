// components/Section5.tsx
import Image from 'next/image';
import DemoForm from './DemoForm';

export default function Section5() {
  return (
    <div className="section5 padding9x">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 section5-content">
            <h2 className="wow animate__animated animate__fadeInUp">
              If You&apos;re Launching — Launch Like an Institution.
            </h2>
            <p className="wow animate__animated animate__fadeInUp">
              Request an executive demo and we&apos;ll outline the institutional infrastructure
              required to support your brokerage strategy and growth.
            </p>
            <Image
              src="/images/sec-5.webp"
              alt="Launch like an Institution"
              width={500}
              height={340}
              className="img-fluid"
            />
          </div>
          <div className="col-lg-5">
            <DemoForm
              formId="co_second_submit"
              phoneInputId="phonenew"
              countryCodeInputId="real-countrycodenew"
              namePrefix="new"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
