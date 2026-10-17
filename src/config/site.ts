// Public build-time configuration. Never put API keys in VITE_* variables.
export const siteConfig = {
  contactEmail: (import.meta.env.VITE_CONTACT_EMAIL || '').trim(),
  linkedinUrl: (import.meta.env.VITE_LINKEDIN_URL || '').trim(),
  xUrl: (import.meta.env.VITE_X_URL || '').trim(),
  resumeUrl: (import.meta.env.VITE_RESUME_URL || '').trim(),
};

export function isPublishedUrl(value?: string): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !/(^|\.)example\.com$/.test(url.hostname)
      && !(url.hostname === 'github.com' && url.pathname.startsWith('/example/'));
  } catch { return false; }
}

export function contactMailto(email: string, data: {name: string; email: string; subject: string; message: string}): string {
  const params = new URLSearchParams({
    subject: data.subject.trim() || `Portfolio enquiry from ${data.name.trim()}`,
    body: `${data.message.trim()}\n\nFrom: ${data.name.trim()} <${data.email.trim()}>`,
  });
  return `mailto:${encodeURIComponent(email)}?${params.toString().replace(/\+/g, '%20')}`;
}
