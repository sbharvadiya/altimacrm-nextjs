'use client';
// components/SuccessModal.tsx

import Image from 'next/image';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <div className={`modal-overlay${isOpen ? ' open' : ''}`} id="myModal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body text-center p-5">
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close">
              ✕
            </button>
            <Image
              src="/images/Thanks.webp"
              alt="Thank you"
              width={200}
              height={160}
              className="img-fluid mb-3"
            />
            <p>Your message has been successfully submitted.</p>
            <p>We&apos;ll get back to you shortly.</p>
            <button type="button" className="common-btn mt-4" onClick={onClose}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
