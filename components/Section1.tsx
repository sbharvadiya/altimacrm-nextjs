// components/Section1.tsx
import DemoForm from './DemoForm';

export default function Section1() {
  return (
    <div className="section1" id="formpt">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <DemoForm
              formId="co_form_submit"
              phoneInputId="contact_phone"
              countryCodeInputId="real-countrycode"
              namePrefix=""
            />
          </div>

          <div className="col-lg-7 section1-content">
            <h2 className="wow animate__animated animate__fadeInUp">
              Your <span className="blue-text">Infrastructure</span> Determines How Serious You Look.
            </h2>
            <p className="wow animate__animated animate__fadeInUp">
              Two brokerages may share the same trading platform and liquidity, yet one attracts
              serious IBs while the other struggles. The difference lies in operational structure —
              how clean onboarding feels, how transparent commissions are, and how confidently
              reporting can be delivered.
            </p>
            <ul className="list">
              <li>Transparent IB logic and commission accuracy</li>
              <li>Controlled onboarding and KYC workflows</li>
              <li>Real-time reporting dashboards</li>
              <li>Role-based access and internal discipline</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
