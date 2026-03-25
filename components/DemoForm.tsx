'use client';
// components/DemoForm.tsx
// Reusable "Schedule a Demo" form used in Section1 and Section5

import { useEffect, useRef, useState } from 'react';
import { buildTrackingFields } from '@/lib/tracking';

interface DemoFormProps {
  formId: string;
  phoneInputId: string;
  countryCodeInputId: string;
  namePrefix?: string; // '' for first form, 'new' for second form
  onSuccess?: () => void;
}

export default function DemoForm({
  formId,
  phoneInputId,
  countryCodeInputId,
  namePrefix = '',
  onSuccess,
}: DemoFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const itiRef = useRef<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Field names depend on which form instance
  const fields = {
    fname:   namePrefix ? 'firstname'      : 'fname',
    lname:   namePrefix ? 'lastname'       : 'lname',
    email:   namePrefix ? 'emailnew'       : 'email',
    phone:   namePrefix ? 'phonenew'       : 'contact_phone',
    message: namePrefix ? 'voip_comment_new' : 'voip_comment',
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Dynamically load intl-tel-input
    const loadITI = async () => {
      const iti = await import('intl-tel-input');
      const phoneEl = document.getElementById(phoneInputId) as HTMLInputElement;
      if (!phoneEl) return;

      const cfCountry = (
        document.querySelector('meta[name="cf-country"]')?.getAttribute('content') || 'in'
      ).toLowerCase();

      itiRef.current = iti.default(phoneEl, {
        initialCountry: cfCountry,
        separateDialCode: true,
        preferredCountries: ['in', 'us', 'gb', 'ae'],
        dropdownContainer: document.body,
        useFullscreenPopup: false,
        utilsScript:
          'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.js',
      });

      setTimeout(() => {
        const countryInput = document.getElementById(countryCodeInputId) as HTMLInputElement;
        if (countryInput && itiRef.current?.getSelectedCountryData()?.dialCode) {
          countryInput.value = '+' + itiRef.current.getSelectedCountryData().dialCode;
        }
      }, 200);

      phoneEl.addEventListener('countrychange', () => {
        const countryInput = document.getElementById(countryCodeInputId) as HTMLInputElement;
        if (countryInput) {
          countryInput.value = '+' + itiRef.current.getSelectedCountryData().dialCode;
        }
      });
    };

    loadITI();
  }, [phoneInputId, countryCodeInputId]);

  // ----- Validation helpers -----
  const isValidName  = (v: string) => /^[a-zA-Z\u00C0-\u024F\u0600-\u06FF]+([a-zA-Z\u00C0-\u024F\u0600-\u06FF] {0,1})*[a-zA-Z\u00C0-\u024F\u0600-\u06FF]$/i.test(v);
  const isValidEmail = (v: string) => /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/i.test(v);
  const isValidPhone = (v: string) => /^[0-9]{5,17}$/i.test(v);

  function validate(data: FormData): Record<string, string> {
    const e: Record<string, string> = {};
    const fname   = (data.get(fields.fname)   as string || '').trim();
    const lname   = (data.get(fields.lname)   as string || '').trim();
    const email   = (data.get(fields.email)   as string || '').trim();
    const phone   = (data.get(fields.phone)   as string || '').trim();
    const message = (data.get(fields.message) as string || '').trim();

    if (!fname || !isValidName(fname))   e[fields.fname]   = 'Please provide valid name';
    if (!lname || !isValidName(lname))   e[fields.lname]   = 'Please provide valid last name';
    if (!email || !isValidEmail(email))  e[fields.email]   = 'Please provide valid email address';
    if (!phone || !isValidPhone(phone))  e[fields.phone]   = 'Please provide valid phone number';
    if (!message)                        e[fields.message] = 'Required Field';
    return e;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    // Add intl tel formatted number
    if (itiRef.current) {
      formData.set(fields.phone, itiRef.current.getNumber());
    }

    // Honeypot check
    if (formData.get('website')) return;

    // Turnstile check
    const token = formRef.current.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value;
    if (!token) {
      alert('Security verification failed.');
      return;
    }
    formData.append('turnstile_token', token);

    // Client validation
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    // Inject tracking fields
    const tracking = buildTrackingFields();
    Object.entries(tracking).forEach(([key, val]) => formData.set(key, val));

    setSubmitting(true);

    try {
      const response = await fetch('/api/submit', { method: 'POST', body: formData });
      const result = await response.json();
      if (result.success) {
        onSuccess?.();
        window.location.href = '/thank-you/?success=1';
      } else {
        window.location.href = '/thank-you/?success=0';
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="contact-form">
      <h3 className="wow animate__animated animate__fadeInUp">Schedule a Demo</h3>
      <form ref={formRef} id={formId} name={formId} onSubmit={handleSubmit} noValidate>
        {/* Honeypot */}
        <input type="hidden" name="website" />
        <input type="hidden" name="form_start_time" value={Date.now()} />

        <div className="row wow animate__animated animate__fadeInUp">
          {/* First Name */}
          <div className="col-md-6">
            <div className="form-group">
              <div className="input-border">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  name={fields.fname}
                />
              </div>
              {errors[fields.fname] && (
                <span className="error">{errors[fields.fname]}</span>
              )}
            </div>
          </div>

          {/* Last Name */}
          <div className="col-md-6">
            <div className="form-group">
              <div className="input-border">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  name={fields.lname}
                />
              </div>
              {errors[fields.lname] && (
                <span className="error">{errors[fields.lname]}</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="col-md-6">
            <div className="form-group">
              <div className="input-border">
                <input
                  type="text"
                  className="form-control"
                  placeholder="your email"
                  name={fields.email}
                />
              </div>
              {errors[fields.email] && (
                <span className="error">{errors[fields.email]}</span>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="col-md-6">
            <div className="form-group">
              <div className="input-border">
                <input type="hidden" id={countryCodeInputId} name={countryCodeInputId} />
                <input
                  type="tel"
                  className="form-control"
                  name={fields.phone}
                  id={phoneInputId}
                  placeholder="Phone number"
                />
              </div>
              {errors[fields.phone] && (
                <span className="error">{errors[fields.phone]}</span>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="col-md-12">
            <div className="form-group">
              <div className="input-border">
                <textarea
                  rows={3}
                  className="form-control"
                  name={fields.message}
                  placeholder="Message"
                />
              </div>
              {errors[fields.message] && (
                <span className="error">{errors[fields.message]}</span>
              )}
            </div>
          </div>

          {/* Cloudflare Turnstile */}
          <div className="col-md-12">
            <div className="form-group position-relative">
              <div className="cf-turnstile" data-sitekey="0x4AAAAAACg3IvIXbMHSsDkM" />
            </div>
          </div>

          {/* Submit */}
          <div className="col-md-12 pt-5">
            <button type="submit" className="common-btn submitbtn" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Contact Sales'}
            </button>
            <p className="text-center mt-1">
              <small>(Software provider. No financial services.)</small>
            </p>
            {submitting && <div className="spinner-border" role="status" />}
          </div>
        </div>
      </form>
    </div>
  );
}
