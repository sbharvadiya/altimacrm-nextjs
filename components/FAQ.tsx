'use client';
// components/FAQ.tsx

import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How is this different from generic CRM systems?',
    answer: 'Generic CRMs manage sales pipelines. AltimaCRM manages brokerage operations.',
  },
  {
    id: 'faq2',
    question: 'Does infrastructure impact credibility?',
    answer: 'Yes. Structured workflows and commission transparency signal professionalism.',
  },
  {
    id: 'faq3',
    question: 'Can it support long-term expansion?',
    answer: 'Yes. Modular architecture supports regional growth and regulatory upgrades.',
  },
  {
    id: 'faq4',
    question: 'Can it align with our brokerage model?',
    answer: 'Yes. Workflows and permissions adapt to your operating structure.',
  },
  {
    id: 'faq5',
    question: 'Will this replace multiple tools?',
    answer: 'Yes. It centralizes CRM, IB management, onboarding, and reporting into one system.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string>('faq1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <div className="faq">
      <div className="container">
        <div className="row">
          <h2 className="wow animate__animated animate__fadeInUp">FAQ</h2>
          <div className="accordion" id="accordionExample">
            {faqData.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div className="accordion-item" key={item.id}>
                  <h3
                    className="accordion-header wow animate__animated animate__fadeInUp"
                    id={`heading-${item.id}`}
                  >
                    <button
                      className={`accordion-button${isOpen ? ' open' : ' collapsed'}`}
                      type="button"
                      onClick={() => toggle(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`collapse-${item.id}`}
                    >
                      {item.question}
                    </button>
                  </h3>
                  <div
                    id={`collapse-${item.id}`}
                    className={`accordion-collapse${isOpen ? '' : ' collapsed'}`}
                    style={{ maxHeight: isOpen ? '300px' : '0' }}
                    aria-labelledby={`heading-${item.id}`}
                  >
                    <div className="accordion-body wow animate__animated animate__fadeInUp">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
