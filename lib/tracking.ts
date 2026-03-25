// lib/tracking.ts
// Session intelligence & UTM tracking utilities

export function captureUTMParams(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => {
    if (value) localStorage.setItem('qp_' + key, value);
  });
  if (window.location.search) {
    localStorage.setItem('qp_raw', window.location.search);
  }
}

export function initSessionIntelligence(): void {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem('first_visit_timestamp')) {
    localStorage.setItem('first_visit_timestamp', new Date().toISOString());
  }

  const visits = parseInt(localStorage.getItem('number_of_visits') || '0') + 1;
  localStorage.setItem('number_of_visits', String(visits));

  if (!localStorage.getItem('landing_page_url')) {
    localStorage.setItem('landing_page_url', window.location.href);
  }

  if (!localStorage.getItem('referrer') && document.referrer) {
    localStorage.setItem('referrer', document.referrer);
  }

  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrolled = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    if (scrolled > maxScroll) {
      maxScroll = scrolled;
      sessionStorage.setItem('scroll_depth', maxScroll + '%');
    }
  });
}

export function getDeviceType(): string {
  if (typeof navigator === 'undefined') return 'Desktop';
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

export function buildTrackingFields(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  const fields: Record<string, string> = {};

  // URL params first (most reliable)
  urlParams.forEach((value, key) => {
    if (value) {
      fields['qp_' + key] = value;
      localStorage.setItem('qp_' + key, value);
    }
  });

  // Fill missing from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('qp_') && !fields[key]) {
      fields[key] = localStorage.getItem(key) || '';
    }
  });

  const storedFirstVisit = localStorage.getItem('first_visit_timestamp');
  if (!storedFirstVisit) {
    const now = new Date().toISOString();
    localStorage.setItem('first_visit_timestamp', now);
    fields['first_visit_timestamp'] = now;
  } else {
    fields['first_visit_timestamp'] = storedFirstVisit;
  }

  const visits = parseInt(localStorage.getItem('number_of_visits') || '0') + 1;
  localStorage.setItem('number_of_visits', String(visits));

  fields['landing_page_url'] = localStorage.getItem('landing_page_url') || window.location.href;
  fields['referrer'] = localStorage.getItem('referrer') || document.referrer || '';
  fields['number_of_visits'] = String(visits);
  fields['submission_timestamp'] = new Date().toISOString();
  fields['scroll_depth'] = sessionStorage.getItem('scroll_depth') || '0%';
  fields['device_type'] = getDeviceType();
  fields['user_agent'] = navigator.userAgent;
  fields['timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return fields;
}
