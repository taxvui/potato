import React, { useState } from 'react';
import { siteConfig, contactMailto } from '../config/site';
import { Mail, MapPin, Send, Check, Copy, Clock, MessageSquare } from 'lucide-react';
import { Section } from '../components/Section';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../hooks/useI18n';
import { SOCIAL_LINKS } from '../data/portfolioData';
import { SocialIcon } from '../components/SocialIcon';
import { SocialLink } from '../components/SocialLink';

export const Contact: React.FC = () => {
  const { theme, accentConfig } = useTheme();
  const { t } = useI18n();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copyError, setCopyError] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactEmail = siteConfig.contactEmail;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopiedEmail(true);
      setCopyError(false);
    } catch { setCopyError(true); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    window.location.href = contactMailto(contactEmail, formData);
  };

  return (
    <Section
      id="contact"
      eyebrow={t.contact.eyebrow}
      title={t.contact.title}
      subtitle={t.contact.subtitle}
      align="center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info & Availability Channels */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard
            level="medium"
            padding="lg"
            interactive
            tilt
            glare
            className="group hover:shadow-xl transition-shadow duration-300"
          >
            <h3
              className={`text-lg font-bold mb-4 tracking-tight ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              {t.contact.channelsTitle}
            </h3>

            <div className="space-y-4 text-sm">
              {/* Email channel */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {t.contact.emailLabel}
                </span>
                <div className="flex items-center justify-between gap-2 p-3 rounded-xl glass-light border border-white/20 dark:border-white/10">
                  <div className="flex items-center gap-3 truncate">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border shadow-xs bg-clip-padding"
                      style={{
                        background: isDark
                          ? `linear-gradient(135deg, ${accentConfig.hex}30, rgba(15,23,42,0.6))`
                          : `linear-gradient(135deg, ${accentConfig.hex}25, rgba(255,255,255,0.95))`,
                        borderColor: `${accentConfig.hex}66`,
                        color: isDark ? accentConfig.hex : accentConfig.dark,
                      }}
                    >
                      <Mail className="w-4 h-4 drop-shadow-xs" strokeWidth={2.4} />
                    </div>
                    <span className="font-mono text-xs truncate select-all text-slate-800 dark:text-slate-200">{contactEmail || t.preview.unavailable}</span>
                  </div>
                  <button
                    id="contact-copy-email-btn"
                    disabled={!contactEmail}
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg hover:bg-slate-700/20 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors shrink-0 cursor-pointer"
                    title={copiedEmail ? t.contact.copied : t.contact.copyTooltip}
                    aria-label={t.contact.copyTooltip}
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" strokeWidth={2.5} /> : <Copy className="w-4 h-4" strokeWidth={2.2} />}
                  </button>
                </div>
              </div>

              {/* Location channel */}
              <div className="space-y-1 pt-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {t.contact.locationLabel}
                </span>
                <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border shadow-xs bg-clip-padding"
                    style={{
                      background: isDark
                        ? `linear-gradient(135deg, ${accentConfig.hex}30, rgba(15,23,42,0.6))`
                        : `linear-gradient(135deg, ${accentConfig.hex}25, rgba(255,255,255,0.95))`,
                      borderColor: `${accentConfig.hex}66`,
                      color: isDark ? accentConfig.hex : accentConfig.dark,
                    }}
                  >
                    <MapPin className="w-4 h-4 drop-shadow-xs" strokeWidth={2.4} />
                  </div>
                  <span className="font-medium">{t.contact.locationValue}</span>
                </div>
              </div>

              {/* Current Status */}
              <div className="space-y-1 pt-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {t.contact.statusLabel}
                </span>
                <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border shadow-xs bg-clip-padding"
                    style={{
                      background: isDark
                        ? `linear-gradient(135deg, ${accentConfig.hex}30, rgba(15,23,42,0.6))`
                        : `linear-gradient(135deg, ${accentConfig.hex}25, rgba(255,255,255,0.95))`,
                      borderColor: `${accentConfig.hex}66`,
                      color: isDark ? accentConfig.hex : accentConfig.dark,
                    }}
                  >
                    <Clock className="w-4 h-4 drop-shadow-xs" strokeWidth={2.4} />
                  </div>
                  <span className="font-medium">{t.contact.statusValue}</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Social Presence Card */}
          <GlassCard
            level="light"
            padding="md"
            interactive
            tilt
            glare
            className="group hover:shadow-xl transition-shadow duration-300"
          >
            <h4
              className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {t.contact.socialConnect}
            </h4>

            <div className="grid grid-cols-2 gap-2.5">
              {SOCIAL_LINKS.map((item) => (
                <SocialLink
                  key={item.name}
                  id={`contact-social-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                  item={item}
                  className={`group flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-medium transition-all duration-200 shadow-xs hover:shadow-md border hover:scale-102 ${
                    isDark
                      ? 'bg-slate-900/60 border-white/10 text-slate-200 hover:text-white hover:border-[var(--color-accent-border)]'
                      : 'bg-white/80 border-slate-200/80 text-slate-800 hover:text-slate-950 hover:border-[var(--color-accent-border)]'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border shadow-xs transition-transform duration-300 group-hover:scale-110 bg-clip-padding"
                    style={{
                      background: isDark
                        ? `linear-gradient(135deg, ${accentConfig.hex}30, rgba(15,23,42,0.6))`
                        : `linear-gradient(135deg, ${accentConfig.hex}25, rgba(255,255,255,0.95))`,
                      borderColor: `${accentConfig.hex}66`,
                      color: isDark ? accentConfig.hex : accentConfig.dark,
                    }}
                  >
                    <SocialIcon name={item.name} className="w-4 h-4 drop-shadow-xs" />
                  </div>
                  <span className="min-w-0"><span className="block font-semibold truncate">{item.name}</span>{!item.url && <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400">{t.contact.socialPending}</span>}</span>
                </SocialLink>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Interactive Inquiry Form with Magnetic CTA */}
        <div className="lg:col-span-7">
          <GlassCard
            level="medium"
            padding="lg"
            interactive
            tilt
            glare
            className="group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs bg-clip-padding"
                style={{
                  background: isDark
                    ? `linear-gradient(135deg, ${accentConfig.hex}35, rgba(15,23,42,0.6))`
                    : `linear-gradient(135deg, ${accentConfig.hex}25, rgba(255,255,255,0.95))`,
                  borderColor: `${accentConfig.hex}66`,
                  boxShadow: `0 2px 10px ${accentConfig.glow}`,
                  color: isDark ? accentConfig.hex : accentConfig.dark,
                }}
              >
                <MessageSquare className="w-5 h-5 drop-shadow-xs" strokeWidth={2.4} />
              </div>
              <h3
                className={`text-lg font-bold tracking-tight ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                {t.contact.directDispatch}
              </h3>
            </div>

            <p role="status" className="mb-5 text-sm text-slate-500 dark:text-slate-400">
              {contactEmail ? t.preview.hint : t.preview.unconfigured}
              {copyError && <span className="block">{t.preview.copyFailed}</span>}
            </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
                    >
                      {t.contact.formName} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder={t.contact.formNamePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all outline-none glass-light focus:ring-1 ${
                        isDark
                          ? 'text-slate-100 placeholder-slate-500'
                          : 'text-slate-900 placeholder-slate-400'
                      }`}
                      style={{
                        borderColor: 'var(--color-accent-border)',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
                    >
                      {t.contact.formEmail} *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder={t.contact.formEmailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all outline-none glass-light focus:ring-1 ${
                        isDark
                          ? 'text-slate-100 placeholder-slate-500'
                          : 'text-slate-900 placeholder-slate-400'
                      }`}
                      style={{
                        borderColor: 'var(--color-accent-border)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
                  >
                    {t.contact.formSubject}
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder={t.contact.formSubjectPlaceholder}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all outline-none glass-light focus:ring-1 ${
                      isDark
                        ? 'text-slate-100 placeholder-slate-500'
                        : 'text-slate-900 placeholder-slate-400'
                    }`}
                    style={{
                      borderColor: 'var(--color-accent-border)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
                  >
                    {t.contact.formMessage} *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder={t.contact.formMessagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all outline-none resize-none glass-light focus:ring-1 ${
                      isDark
                        ? 'text-slate-100 placeholder-slate-500'
                        : 'text-slate-900 placeholder-slate-400'
                    }`}
                    style={{
                      borderColor: 'var(--color-accent-border)',
                    }}
                  />
                </div>

                <div className="pt-2">
                  <GlassButton
                    id="contact-submit-btn"
                    type="submit"
                    size="lg"
                    variant="primary"
                    magnetic
                    disabled={!contactEmail}
                    iconRight={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    {t.preview.mail}
                  </GlassButton>
                </div>
              </form>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
};

